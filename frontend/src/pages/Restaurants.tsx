import React from "react";
import { Stack, Flex, TextInput, Grid, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import RestaurantCard from "../components/RestaurantCard";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const Restaurants = () => {
  const { status, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["restaurants"],
    getNextPageParam: (prevData: any) => prevData.nextPage,
    queryFn: ({ pageParam = 0 }) => getRestaurantsPaginated(pageParam),
  });

  function getRestaurantsPaginated(page: number) {
    return axios
      .get("http://localhost:8000/api/restaurants", {
        params: { q: "", page },
      })
      .then(res => res.data);
  }

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error, null, 2)}</h1>;

  return (
    <Stack py={30} pos={"relative"} spacing={50}>
      <TextInput
        mx={"auto"}
        w={"100%"}
        maw={"400px"}
        placeholder="Search for restaurants"
        icon={<IconSearch size="1rem" />}
        // rightSection={query !== "" ? <CloseButton onClick={handleSearch} /> : null}
      />

      <Flex>
        <div>
          <Grid gutter={"3%"}>
            {data.pages
              .map(x => x.restaurants)
              .flat()
              .map((item: any, index: number) => {
                return (
                  <Grid.Col key={item._id} xs={6} sm={4} md={4} lg={3}>
                    <RestaurantCard restaurant={item} />
                  </Grid.Col>
                );
              })}
          </Grid>
        </div>
      </Flex>

      {hasNextPage && (
        <Button
          className="custom-button"
          loading={isFetchingNextPage}
          color="rgb(216,9,47)"
          w={"200px"}
          mx={"auto"}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </Stack>
  );
};

export default React.memo(Restaurants);
