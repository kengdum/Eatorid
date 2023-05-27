import { Container, Flex, Title, CloseButton, Text, Button, Stack } from "@mantine/core";

import { useUI } from "../contexts/UIContext";
import { useCart } from "../contexts/CartContext";

const SwitchRestaurantModal = () => {
  const { setShowModal } = useUI();
  const { cart, discardCart } = useCart();

  return (
    <Container py={25}>
      <Stack spacing="xl" w={"100%"}>
        <Container px={25} w={"100%"}>
          <Flex align={"center"} justify={"space-between"}>
            <Title order={3}>Switch Restaurant Alert</Title>
            <CloseButton title="Close sign in" size={"lg"} onClick={() => setShowModal("null")} />
          </Flex>
        </Container>

        <Container px={25} w={"100%"}>
          <Text>
            Your already have items from{" "}
            <Text color="pink" span fw={700}>
              {cart?.header.restaurantName}
            </Text>{" "}
            restaurant. This action will discard your current cart
          </Text>
        </Container>

        <Container px={25} w={"100%"}>
          <Flex gap="lg">
            <Button variant="default" w={"100%"} onClick={() => setShowModal("null")}>
              Cancel
            </Button>
            <Button w={"100%"} onClick={() => discardCart()}>
              Confirm
            </Button>
          </Flex>
        </Container>
      </Stack>
    </Container>
  );
};

export default SwitchRestaurantModal;
