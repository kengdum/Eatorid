import React from "react";
import { Button, Flex, Grid, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useRestaurants } from "../contexts/RestaurantsContext";

const HomeRestaurantsSection = () => {
  const { featuredRestaurants } = useRestaurants();

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Title>Restaurants</Title>
        <Button component={Link} to="/restaurants" variant="subtle">
          View all
        </Button>
      </Flex>

      <Grid>
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
