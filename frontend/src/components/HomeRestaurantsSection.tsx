import React, { useEffect } from "react";
import { Button, Flex, Grid, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useRestaurants } from "../contexts/RestaurantsContext";

const HomeRestaurantsSection = () => {
  const { featuredRestaurants, cancelTokenSource, getFeaturedRestaurants } = useRestaurants();

  useEffect(() => {
    if (featuredRestaurants.length === 0) getFeaturedRestaurants();

    return () => {
      console.log("goodb");
      cancelTokenSource?.cancel();
    };
  }, []);

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Title order={2}>Restaurants</Title>
        <Button component={Link} to="/restaurants" variant="subtle">
          View all
        </Button>
      </Flex>

      <Grid gutter={"3%"}>
        {featuredRestaurants.map(item => (
          <Grid.Col key={item._id} xs={6} sm={6} md={3} lg={3}>
            <RestaurantCard restaurant={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default HomeRestaurantsSection;
