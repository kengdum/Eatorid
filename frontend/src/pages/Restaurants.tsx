import React, { useRef, useCallback } from "react";
import RestaurantsList from "../components/RestaurantsList";
import { Stack, TextInput, Text, Grid, Affix, Transition, Button, rem, CloseButton } from "@mantine/core";
import { IconSearch, IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { useRestaurants } from "../contexts/RestaurantsContext";
import RestaurantCard from "../components/RestaurantCard";

const Restaurants = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const { restaurants, loading, error, hasMore, query, pageNumber, handleSearch, setPageNumber } = useRestaurants();

  const observer: React.MutableRefObject<IntersectionObserver | null> = useRef(null);
  const lastRestaurantRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible");
          setPageNumber(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Stack pos={"relative"}>
      <TextInput
        mx={"auto"}
        w={"100%"}
        maw={"400px"}
        value={query}
        onChange={e => handleSearch(e.currentTarget.value)}
        placeholder="Search for restaurants"
        icon={<IconSearch size="1rem" />}
        rightSection={query !== "" ? <CloseButton onClick={e => handleSearch("")} /> : null}
      />
      {/* <RestaurantsList /> */}

      <Grid>
        {restaurants.map((item, index) => {
          if (restaurants.length === index + 1) {
            return (
              <Grid.Col ref={lastRestaurantRef} key={item._id} xs={6} sm={6} md={3} lg={3}>
                <RestaurantCard restaurant={item} />
              </Grid.Col>
            );
          } else {
            return (
              <Grid.Col key={item._id} xs={6} sm={6} md={3} lg={3}>
                <RestaurantCard restaurant={item} />
              </Grid.Col>
            );
          }
        })}
      </Grid>

      {loading && "Loading..."}
      {error && "Error!"}

      <Affix position={{ bottom: rem(20), right: rem(20) }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <Button leftIcon={<IconArrowUp size="1rem" />} style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </Stack>
  );
};

export default Restaurants;
