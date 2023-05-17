import React from "react";
import { Stack } from "@mantine/core";
import HomeFeaturesSection from "../components/HomeFeaturesSection";
import HomeRestaurantsSection from "../components/HomeRestaurantsSection";

const Home = () => {
  return (
    <Stack>
      <HomeFeaturesSection />
      <HomeRestaurantsSection />
    </Stack>
  );
};

export default Home;
