// RestaurantList.js

import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Grid } from "@mantine/core";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/restaurants?page=${page}`);
        const data = await response.json();

        setRestaurants(prevRestaurants => [...prevRestaurants, ...data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [page]);

  const handleIntersection = (entries: any) => {
    if (entries[0].isIntersecting) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const sentinel = document.querySelector("#sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, []);

  return (
    <Grid>
      {restaurants.map(item => (
        <Grid.Col key={item._id} xs={6} sm={6} md={3} lg={3}>
          <RestaurantCard restaurant={item} />
        </Grid.Col>
      ))}
      {loading && <p>Loading...</p>}
      <div id="sentinel"></div>
    </Grid>
  );
};

export default RestaurantsList;
