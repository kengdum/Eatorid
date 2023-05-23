import React from "react";
import { ActionIcon, CloseButton, Title, Container, Text, Stack, Flex, Card, Divider } from "@mantine/core";
import { IconMinus, IconShoppingCart } from "@tabler/icons-react";
import { useCart } from "../contexts/CartContext";
import { useUI } from "../contexts/UIContext";

const CartModal = () => {
  const { cart } = useCart();
  const { setShowModal } = useUI();

  return (
    <Container p={0}>
      <Container p={25}>
        <Flex align={"center"} justify={"space-between"}>
          <Title>Cart</Title>
          <CloseButton title="Close sign in" size={"lg"} onClick={() => setShowModal("null")} />
        </Flex>
      </Container>

      <Container>
        {cart?.items.map(x => (
          <>
            <Card>
              <Flex gap="lg" align={"center"} justify={"space-between"}>
                <Flex gap="sm" align="center">
                  <Text size="sm" color="pink" fw="900">
                    {x.quantity}x
                  </Text>
                  <Text size="sm" fw="700">
                    {x.name}
                  </Text>
                </Flex>

                <Flex gap="sm" align={"center"}>
                  <Text size="sm">{x.price} RON</Text>
                  <ActionIcon color="pink" size="md" radius="xl" variant="filled">
                    <IconMinus />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Card>

            <Divider />
          </>
        ))}
      </Container>

      <Container>
        <Card>
          <Stack>
            <Flex justify={"space-between"}>
              <Text color="dimmed">Subtotal</Text>
              <Text color="dimmed">{100} RON</Text>
            </Flex>
          </Stack>

          <Stack>
            <Flex justify={"space-between"}>
              <Text color="dimmed">Delivery fee</Text>
              <Text color="dimmed">{5} RON</Text>
            </Flex>
          </Stack>

          <Stack>
            <Flex justify={"space-between"}>
              <Text fw="700">Order total</Text>
              <Text fw="700">{cart?.items.reduce((acc, item) => item.quantity * item.price + acc, 0)} RON</Text>
            </Flex>
          </Stack>
        </Card>
      </Container>

      <Divider />
    </Container>
  );
};

export default CartModal;
