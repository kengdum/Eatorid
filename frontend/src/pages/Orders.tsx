import { Stack, Title, Center, Loader, Text, Button } from "@mantine/core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import OrderCard from "../components/OrderCard";
import { IOrder } from "../interfaces/Order";

const Orders = () => {
  const { user } = useAuth();

  const accessToken = Cookies.get("accessToken");

  const { status, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<{
    nextPage: number | undefined;
    orders: IOrder[];
  }>({
    retry: false,
    refetchOnWindowFocus: false,
    queryKey: ["orders", user?.id],
    getNextPageParam: (prevData: any) => prevData.nextPage,
    queryFn: ({ pageParam = 0 }) => getOrdersPaginated(pageParam),
  });

  function getOrdersPaginated(page: number) {
    return axios
      .get("/api/orders", {
        params: { page },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => res.data);
  }

  return (
    <Stack>
      <Title>My orders</Title>

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
          {data.pages[0].orders.length === 0 ? (
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
              {data?.pages
                .map(x => x.orders)
                .flat()
                .map(item => {
                  return <OrderCard key={item._id} order={item} />;
                })}

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

export default Orders;
