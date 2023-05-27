import { Stack, Text, TextInput, Grid, Button, Loader, Center, CloseButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import RestaurantCard from "../components/RestaurantCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { IRestaurant } from "../interfaces/Restaurant";
import { useDebouncedState } from "@mantine/hooks";

const Restaurants = () => {
  const [query, setQuery] = useDebouncedState("", 500);

  const { status, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<{
    nextPage: number | undefined;
    total: number | undefined;
    restaurants: IRestaurant[];
  }>({
    retry: false,
    refetchOnWindowFocus: false,
    queryKey: ["restaurants", query],
    getNextPageParam: (prevData: any) => prevData.nextPage,
    queryFn: ({ pageParam = 0 }) => getRestaurantsPaginated(pageParam),
  });

  function getRestaurantsPaginated(page: number) {
    return axios
      .get("/api/restaurants", {
        params: { q: query, page },
      })
      .then(res => res.data);
  }

  return (
    <Stack py={30} pos={"relative"} spacing={50}>
      <TextInput
        defaultValue={query}
        onChange={e => setQuery(e.currentTarget.value)}
        aria-disabled={true}
        disabled={status !== "success"}
        mx={"auto"}
        w={"100%"}
        maw={"400px"}
        placeholder="Search for restaurants"
        icon={<IconSearch size="1rem" />}
        rightSection={query !== "" ? <CloseButton onClick={() => setQuery("")} /> : null}
      />

      {status === "loading" ? (
        <Center>
          <Loader />
        </Center>
      ) : status === "error" ? (
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
      ) : (
        <>
          {data.pages[0].restaurants.length === 0 ? (
            <Center>
              <Stack>
                <Text ta="center" fz={48}>
                  😢
                </Text>
                <Text ta="center" color="dimmed">
                  No results
                </Text>
              </Stack>
            </Center>
          ) : (
            <>
              <Grid gutter={"3%"}>
                {data?.pages
                  .map(x => x.restaurants)
                  .flat()
                  .map(item => {
                    return (
                      <Grid.Col key={item._id.toString()} xs={6} sm={4} md={4} lg={3}>
                        <RestaurantCard restaurant={item} />
                      </Grid.Col>
                    );
                  })}
              </Grid>

              {hasNextPage && (
                <Button loading={isFetchingNextPage} w={"200px"} mx={"auto"} onClick={() => fetchNextPage()}>
                  Load more
                </Button>
              )}
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export default Restaurants;
