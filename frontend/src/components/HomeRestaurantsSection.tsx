import React from "react";
import { Button, Flex, Grid, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useRestaurants } from "../contexts/RestaurantsContext";
import RestaurantCard from "./RestaurantCard";

const HomeRestaurantsSection = () => {
  const { restaurants } = useRestaurants();

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Title>Restaurants</Title>
        <Button component={Link} to="/restaurants" variant="subtle">
          View all
        </Button>
      </Flex>

      <Grid>
        {restaurants.map(item => (
          <Grid.Col key={item.id} xs={6} sm={6} md={3} lg={3}>
            <RestaurantCard restaurant={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default HomeRestaurantsSection;
