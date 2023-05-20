import axios, { CancelTokenSource, Canceler } from "axios";
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
  cancelTokenSource: CancelTokenSource | null;
  handleSearch: (val: string) => void;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  getFeaturedRestaurants: () => void;
  setFeaturedRestaurants: React.Dispatch<React.SetStateAction<any[]>>;
  getRestaurants: () => void;
}

const defaultState = {
  featuredRestaurants: [],
  query: "",
  pageNumber: 1,
  loading: true,
  error: false,
  restaurants: [],
  hasMore: false,
  cancelTokenSource: null,
  handleSearch: () => {},
  setPageNumber: () => {},
  getFeaturedRestaurants: () => {},
  setFeaturedRestaurants: () => {},
  getRestaurants: () => {},
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

  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

  useEffect(() => {
    console.log("running useEffect for debouncedQuery");
    // setRestaurants([]);
  }, [debouncedQuery]);

  // useEffect(() => {
  //   let cancel: Canceler;

  //   console.log("hello world");

  //   setLoading(true);
  //   setError(false);

  //   axios({
  //     method: "GET",
  //     url: "http://localhost:8000/api/restaurants",
  //     params: { q: debouncedQuery, page: pageNumber },
  //     cancelToken: new axios.CancelToken(c => (cancel = c)),
  //   })
  //     .then(res => {
  //       setRestaurants(prev => [...prev, ...res.data.restaurants]);
  //       setHasMore(restaurants.length + res.data.restaurants.length < res.data.total);
  //     })
  //     .catch(err => {
  //       if (axios.isCancel(err)) return;
  //       console.log(err);
  //       setError(true);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   return () => {
  //     cancel();
  //   };
  // }, [debouncedQuery, pageNumber]);

  useEffect(() => {
    console.log("running useEffect on query and pageNumber");
  }, [query, pageNumber]);

  const getFeaturedRestaurants = async () => {
    try {
      if (cancelTokenSource) {
        console.log("should cancel");
        cancelTokenSource.cancel("Request canceled due to component re-render");
      }

      const source = axios.CancelToken.source();
      console.log("cancelTokenSource", cancelTokenSource);
      setCancelTokenSource(source);

      const response = await axios.get("http://localhost:8000/api/featured-restaurants", {
        cancelToken: source.token,
      });

      console.log(response.data);

      setFeaturedRestaurants(response.data);
    } catch (err) {
      // if (axios.isCancel(err)) return;
      console.log("error", err);
    }
  };

  const getRestaurants = async () => {
    try {
      if (cancelTokenSource) {
        console.log("should cancel");
        cancelTokenSource.cancel("Request canceled due to component re-render");
      }

      const source = axios.CancelToken.source();
      console.log("cancelTokenSource", cancelTokenSource);
      setCancelTokenSource(source);

      const response = await axios.get("http://localhost:8000/api/restaurants", {
        params: {
          q: debouncedQuery,
          page: pageNumber,
        },
        cancelToken: source.token,
      });

      console.log(response.data);

      setRestaurants(prev => [...prev, ...response.data.restaurants]);
      setHasMore(restaurants.length + response.data.restaurants.length < response.data.total);
    } catch (err) {
      // if (axios.isCancel(err)) return;
      console.log("error", err);
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
    cancelTokenSource,
    handleSearch,
    setPageNumber,
    getFeaturedRestaurants,
    setFeaturedRestaurants,
    getRestaurants,
  };

  return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>;
}
