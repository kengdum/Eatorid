import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { ICart, ICartHeader, ICartItem } from "../interfaces/Cart";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextInterface {
  cart: ICart | null;
  addToCart: (cartHeader: ICartHeader, cartItem: ICartItem) => void;
  removeFromCart: (menuId: string) => void;
}

const defaultState = {
  cart: null,
  addToCart: () => {},
  removeFromCart: () => {},
} as CartContextInterface;

const CartContext = createContext<CartContextInterface>(defaultState);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState(defaultState.cart);

  const { user } = useAuth();

  useEffect(() => {
    const localStorageCart = localStorage.getItem("EOE_CART");
    setCart(localStorageCart ? JSON.parse(localStorageCart) : null);
  }, []);

  const addToCart = (cartHeader: ICartHeader, cartItem: ICartItem) => {
    if (!user) return alert("Sign in!");

    if (!cart) {
      return setCart({
        header: cartHeader,
        items: [cartItem],
        mentions: "",
      });
    }

    if (cart.header.restaurantId !== cartHeader.restaurantId) return alert("restaurants not the same");

    const found = cart.items.find(x => x.menuId === cartItem.menuId);

    if (found) {
      const newCart: ICart = {
        header: cart.header,
        items: cart.items.map(x => (x.menuId === cartItem.menuId ? { ...x, quantity: x.quantity + 1 } : x)),
        mentions: cart.mentions,
      };

      setCart(newCart);
    } else {
      const newCart: ICart = {
        header: cart.header,
        items: [...cart.items, cartItem],
        mentions: cart.mentions,
      };

      setCart(newCart);
    }
  };

  const removeFromCart = (menuId: string) => {
    if (cart?.items.length === 1 && cart.items[0].quantity === 1) {
      return setCart(null);
    }

    const item = cart?.items.find(x => x.menuId === menuId);

    if (item?.quantity === 1) {
      const newCart: ICart = {
        header: cart!.header,
        items: cart!.items.filter(x => x.menuId !== menuId),
        mentions: cart!.mentions,
      };

      setCart(newCart);
    } else {
      const newCart: ICart = {
        header: cart!.header,
        items: cart!.items.map(x => (x.menuId === menuId ? { ...x, quantity: x.quantity - 1 } : x)),
        mentions: cart!.mentions,
      };

      setCart(newCart);
    }
  };

  const value: CartContextInterface = {
    cart,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
