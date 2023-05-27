import { Container, Divider, Flex, Text, Title, CloseButton, Select, Box } from "@mantine/core";

import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import axios from "../axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IOrder } from "../interfaces/Order";

const DevModal = () => {
  const { setShowModal } = useUI();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data } = useQuery<{ orders: IOrder[] }>({
    refetchOnWindowFocus: false,
    retry: false,
    queryKey: ["ordersDev"],
    queryFn: getOrders,
  });

  const { mutate, isError } = useMutation({
    mutationFn: (data: any) => axios.patch("/api/orders", { data }),
  });

  function getOrders() {
    return axios.get("/api/all-orders").then(res => res.data);
  }

  function updateOrderStatus(val: string, orderId: string) {
    return new Promise((resolve, reject) => {
      mutate(
        { val, orderId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["ordersDev"]);
            queryClient.invalidateQueries(["orders", user?.id]);
            resolve(null);
          },
          onError: error => {
            reject(error);
          },
        }
      );
    });
  }

  const handleChange = async (val: string, orderId: string) => {
    try {
      await updateOrderStatus(val, orderId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container p={0}>
      <Container p={25}>
        <Flex align={"center"} justify={"space-between"}>
          <Title>Dev</Title>
          <CloseButton title="Close sign in" size={"lg"} onClick={() => setShowModal("null")} />
        </Flex>
      </Container>

      <Divider />

      <Container p={25}>
        <Text>This is just for simulating orders statuses</Text>
      </Container>

      {isError && (
        <Text px={25} color="red">
          Couldn't complete the request
        </Text>
      )}

      {data?.orders.length === 0 && <Text px={25}>No orders found</Text>}

      <Container p={25}>
        {data?.orders.map((item: IOrder) => (
          <Box style={{ backgroundColor: "#25262b" }} p="sm" mb={5} key={item._id}>
            <Flex align={"center"} justify={"space-between"}>
              <Text>{item.restaurantName}</Text>
              <Select
                value={item.status}
                onChange={(val: string) => handleChange(val, item._id)}
                data={[
                  { value: "confirming", label: "Confirming 👍" },
                  { value: "preparing", label: "Preparing 👩‍🍳" },
                  { value: "delivering", label: "Delivering 🚗" },
                  { value: "rejected", label: "Rejected ❌" },
                  { value: "completed", label: "Completed ✔" },
                ]}
              />
            </Flex>
          </Box>
        ))}
      </Container>
    </Container>
  );
};

export default DevModal;
