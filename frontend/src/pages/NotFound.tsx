import React from "react";
import { Center, Title, Stack, Text, Button } from "@mantine/core";
import HomeFeaturesSection from "../components/HomeFeaturesSection";
import HomeRestaurantsSection from "../components/HomeRestaurantsSection";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Center h={"100%"}>
      <Stack>
        <Text ta="center" fz={32} fw={500}>
          You have found a secret place
        </Text>
        <Text ta="center" maw={450}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to
          another URL
        </Text>
        <Center>
          <Button w="fit-content" component={Link} to="/">
            Take me back to home page
          </Button>
        </Center>
      </Stack>
    </Center>
  );
};

export default NotFound;
