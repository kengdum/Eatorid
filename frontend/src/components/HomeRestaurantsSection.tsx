import { Button, Center, Container, Text, Flex, Grid, Loader, Skeleton, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HomeRestaurantsSection = () => {
  const { status, error, data } = useQuery({
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: ["featuredRestaurants"],
    queryFn: getFeaturedRestaurants,
  });

  console.log("AICI BAIETE", data);

  function getFeaturedRestaurants() {
    return axios.get("http://localhost:8000/api/featured-restaurants").then(res => res.data);
  }

  return (
    <Stack mb={50}>
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"center"} gap="lg">
          <Title>Restaurants</Title>
          {status === "loading" && <Loader />}
        </Flex>
        <Button component={Link} to="/restaurants" variant="subtle">
          View all
        </Button>
      </Flex>

      {status === "error" && (
        <Center>
          <Stack>
            <Text ta="center" fz={48}>
              💩
            </Text>
            <Text ta="center" color="dimmed">
              Could not load the data
            </Text>
          </Stack>
        </Center>
      )}

      <Grid gutter={"3%"}>
        {data?.map((item: any) => (
          <Grid.Col key={item._id} xs={6} sm={6} md={3} lg={3}>
            <RestaurantCard restaurant={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default HomeRestaurantsSection;
