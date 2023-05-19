import axios, { Canceler } from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

interface RestaurantsProviderProps {
  children: ReactNode;
}

interface RestaurantsContextInterface {
  featuredRestaurants: any[];
  query: string;
  pageNumber: number;
  loading: boolean;
  error: boolean;
  restaurants: any[];
  hasMore: boolean;
  handleSearch: (val: string) => void;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const defaultState = {
  featuredRestaurants: [],
  query: "",
  pageNumber: 1,
  loading: true,
  error: false,
  restaurants: [],
  hasMore: false,
  handleSearch: () => {},
  setPageNumber: () => {},
} as RestaurantsContextInterface;

const RestaurantsContext = createContext<RestaurantsContextInterface>(defaultState);

export function useRestaurants() {
  return useContext(RestaurantsContext);
}

export function RestaurantsProvider({ children }: RestaurantsProviderProps) {
  const [featuredRestaurants, setFeaturedRestaurants] = useState(defaultState.featuredRestaurants);
  const [query, setQuery] = useState(defaultState.query);
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [pageNumber, setPageNumber] = useState(defaultState.pageNumber);

  const [loading, setLoading] = useState(defaultState.loading);
  const [error, setError] = useState(defaultState.error);
  const [restaurants, setRestaurants] = useState<any[]>(defaultState.restaurants);
  const [hasMore, setHasMore] = useState(defaultState.hasMore);

  useEffect(() => {
    getFeaturedRestaurants();
    setPageNumber(1);
    console.log("get featured res");
  }, []);

  useEffect(() => {
    setRestaurants([]);
  }, [debouncedQuery]);

  useEffect(() => {
    let cancel: Canceler;

    console.log("hello world");

    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: "http://localhost:8000/api/restaurants",
      params: { q: debouncedQuery, page: pageNumber },
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(res => {
        setRestaurants(prev => [...prev, ...res.data.restaurants]);
        setHasMore(restaurants.length + res.data.restaurants.length < res.data.total);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancel();
    };
  }, [debouncedQuery, pageNumber]);

  const getFeaturedRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/featured-restaurants");
      setFeaturedRestaurants(response.data);
    } catch (err) {
      console.log("redoa");
    }
  };

  const handleSearch = (val: string) => {
    setQuery(val);
  };

  const value: RestaurantsContextInterface = {
    featuredRestaurants,
    query,
    pageNumber,
    restaurants,
    hasMore,
    loading,
    error,
    handleSearch,
    setPageNumber,
  };

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>;
}
