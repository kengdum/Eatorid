import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { ICart, ICartHeader, ICartItem } from "../interfaces/Cart";
import { useUI } from "./UIContext";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CartProviderProps {
  children: ReactNode;
}

interface FormValues {
  address: string;
  distance: number | "";
  mentions?: string;
}

interface CartContextInterface {
  cart: ICart | null;
  orderPlaced: boolean;
  isLoading: boolean;
  isError: boolean;
  addToCart: (cartHeader: ICartHeader, cartItem: ICartItem) => void;
  removeFromCart: (menuId: string) => void;
  discardCart: () => void;
  placeOrder: (values: FormValues, extraDeliveryFee: number) => void;
  setOrderPlaced: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  cart: null,
  orderPlaced: false,
  isLoading: false,
  isError: false,
  addToCart: () => {},
  removeFromCart: () => {},
  discardCart: () => {},
  placeOrder: () => {},
  setOrderPlaced: () => {},
} as CartContextInterface;

const CartContext = createContext<CartContextInterface>(defaultState);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState(defaultState.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const queryClient = useQueryClient();
  const accessToken = Cookies.get("accessToken");

  const { user } = useAuth();
  const { setShowModal } = useUI();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: any) =>
      axios.post(
        "http://localhost:8000/api/orders",
        { data },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
  });

  useEffect(() => {
    const getLocalStorageCart = async () => {
      const hash = localStorage.getItem("EOE_CART_HASH");
      const localStorageCart = localStorage.getItem("EOE_CART");

      if (
        !hash ||
        !localStorageCart ||
        hash !== (await generateSHA256Hash(localStorageCart + process.env.REACT_APP_CART_SECRET!))
      ) {
        return discardCart();
      }

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        return discardCart();
      }

      setCart(JSON.parse(localStorageCart));
    };

    getLocalStorageCart();
  }, []);

  useEffect(() => {
    const setLocalStorageCart = async () => {
      if (!cart) return;

      const cartString = JSON.stringify(cart);
      const hash = await generateSHA256Hash(cartString + process.env.REACT_APP_CART_SECRET!);

      localStorage.setItem("EOE_CART_HASH", hash);
      localStorage.setItem("EOE_CART", cartString);
    };

    setLocalStorageCart();
  }, [cart]);

  const generateSHA256Hash = async (input: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");

    return hashHex;
  };

  const addToCart = (cartHeader: ICartHeader, cartItem: ICartItem) => {
    if (!user) return setShowModal("signin");

    if (!cart) {
      return setCart({
        header: cartHeader,
        items: [cartItem],
        address: "",
        distance: 0,
        mentions: "",
      });
    }

    if (cart.header.restaurantId !== cartHeader.restaurantId) return setShowModal("switchRestaurant");

    const found = cart.items.find(x => x.menuId === cartItem.menuId);

    if (found) {
      const newCart: ICart = {
        header: cart.header,
        items: cart.items.map(x => (x.menuId === cartItem.menuId ? { ...x, quantity: x.quantity + 1 } : x)),
        address: cart.address,
        distance: cart.distance,
        mentions: cart.mentions,
      };

      setCart(newCart);
    } else {
      const newCart: ICart = {
        header: cart.header,
        items: [...cart.items, cartItem],
        address: cart.address,
        distance: cart.distance,
        mentions: cart.mentions,
      };

      setCart(newCart);
    }
  };

  const removeFromCart = (menuId: string) => {
    if (cart?.items.length === 1 && cart.items[0].quantity === 1) {
      return discardCart();
    }

    const item = cart?.items.find(x => x.menuId === menuId);

    if (item?.quantity === 1) {
      const newCart: ICart = {
        header: cart!.header,
        items: cart!.items.filter(x => x.menuId !== menuId),
        address: cart!.address,
        distance: cart!.distance,
        mentions: cart!.mentions,
      };

      setCart(newCart);
    } else {
      const newCart: ICart = {
        header: cart!.header,
        items: cart!.items.map(x => (x.menuId === menuId ? { ...x, quantity: x.quantity - 1 } : x)),
        address: cart!.address,
        distance: cart!.distance,
        mentions: cart!.mentions,
      };

      setCart(newCart);
    }
  };

  const discardCart = () => {
    localStorage.removeItem("EOE_CART_HASH");
    localStorage.removeItem("EOE_CART");
    setCart(null);
    setOrderPlaced(false);
    setShowModal("null");
  };

  const placeOrder = (values: FormValues, extraDeliveryFee: number) => {
    return new Promise((resolve, reject) => {
      mutate(
        { ...values, cart, extraDeliveryFee },
        {
          onSuccess: () => {
            setOrderPlaced(true);
            localStorage.removeItem("EOE_CART_HASH");
            localStorage.removeItem("EOE_CART");
            setCart(null);
            resolve(null);
            queryClient.invalidateQueries(["orders", user?.id]);
          },
          onError: error => {
            reject(error);
          },
        }
      );
    });
  };

  const value: CartContextInterface = {
    cart,
    orderPlaced,
    isLoading,
    isError,
    addToCart,
    removeFromCart,
    discardCart,
    placeOrder,
    setOrderPlaced,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
