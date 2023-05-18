import { ReactNode, createContext, useContext, useState } from "react";
import { Restaurant } from "../../../interfaces/Restaurant";

interface RestaurantsProviderProps {
  children: ReactNode;
}

interface RestaurantsContextInterface {
  restaurants: Restaurant[];
}

const defaultState = {
  restaurants: [
    {
      name: "Babajee Res",
      schedule: [
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
      ],
      minimumOrder: 40,
      deliveryMaxDistance: 5000,
      deliveryPrice: 3.99,
      extraDeliveryFee: 2.99,
    },
    {
      id: "2",
      name: "Souleyman Shawarma",
      schedule: [
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
      ],
      minimumOrder: 0,
      deliveryMaxDistance: 5000,
      deliveryPrice: 3.99,
      extraDeliveryFee: 2.99,
      menu: [],
    },
    {
      id: "3",
      name: "Casuta Gustului",
      schedule: [
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
      ],
      minimumOrder: 25,
      deliveryMaxDistance: 5000,
      deliveryPrice: 0,
      extraDeliveryFee: 2.99,
      menu: [],
    },
    {
      id: "4",
      name: "Igen",
      schedule: [
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 10,
            m: 0,
          },
          close: {
            h: 22,
            m: 0,
          },
          closed: false,
        },
        {
          open: {
            h: 0,
            m: 0,
          },
          close: {
            h: 0,
            m: 0,
          },
          closed: true,
        },
      ],
      minimumOrder: 55,
      deliveryMaxDistance: 3000,
      deliveryPrice: 8.99,
      extraDeliveryFee: 5.99,
      menu: [],
    },
  ],
} as RestaurantsContextInterface;

const RestaurantsContext = createContext<RestaurantsContextInterface>(defaultState);

export function useRestaurants() {
  return useContext(RestaurantsContext);
}

export function RestaurantsProvider({ children }: RestaurantsProviderProps) {
  const [restaurants, setRestaurants] = useState(defaultState.restaurants);

  const value: RestaurantsContextInterface = {
    restaurants,
  };

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>;
}
