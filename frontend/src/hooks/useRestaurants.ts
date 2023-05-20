import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

export default function useRestaurants(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;

    axios({
      method: "GET",
      url: "http://localhost:8000/api/restaurants",
      params: {
        q: query,
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(res => {
        setRestaurants(prev => [...prev, ...res.data.restaurants]);
        setHasMore(restaurants.length + res.data.restaurants.length < res.data.total);
        setLoading(false);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        console.log(err);
        setError(true);
      });

    return () => {
      cancel();
    };
  }, [query, pageNumber]);

  return { loading, error, restaurants, hasMore };
}
