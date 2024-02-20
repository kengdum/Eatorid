import { IconAlertCircle, IconMinus } from "@tabler/icons-react";
import { useCart } from "../contexts/CartContext";
import { useUI } from "../contexts/UIContext";
import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Textarea,
  NumberInput,
  Container,
  Card,
  Stack,
  Flex,
  Text,
  ActionIcon,
  Title,
  CloseButton,
  Center,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface FormValues {
  address: string;
  distance: number | "";
  mentions?: string;
}

const CartModal = () => {
  const { cart, orderPlaced, isLoading, removeFromCart, placeOrder, setOrderPlaced } = useCart();
  const { setShowModal } = useUI();

  const [active, setActive] = useState(0);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOrderPlaced(false);
    setShowModal("null");
  };

  const form = useForm<FormValues>({
    initialValues: {
      address: "",
      distance: "",
      mentions: "",
    },

    validate: values => {
      if (active === 1) {
        return {
          address: values.address.trim().length < 2 ? "Address must include at least 2 characters" : null,
          distance: values.distance === "" || values.distance < 0 ? "Distance must be a filled in" : null,
        };
      }

      return {};
    },
  });

  const subtotal = cart?.items.reduce((acc, item) => item.quantity * item.price + acc, 0);
  const deliveryPrice = cart?.header.deliveryPrice;
  const extraDeliveryFee = Math.max(
    0,
    ((form.values.distance || 0) - (cart?.header.deliveryMaxDistance || 0)) * (cart?.header.extraDeliveryFee || 0)
  );

  const nextStep = async () => {
    try {
      setError("");
      if (form.validate().hasErrors) return setActive(curr => curr);
      if (active === 1) await placeOrder(form.values, extraDeliveryFee);

      setActive(current => (current < 2 ? current + 1 : current));
    } catch (err: any) {
      setError(err?.response?.data.message || "We couldn't complete your order! Please try again");
      console.log("err in CartModal.tsx", err);
    }

    // setActive(current => {
    //   if (form.validate().hasErrors) {
    //     return current;
    //   }
    //   return current < 2 ? current + 1 : current;
    // });
  };

  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  return (
    <Container p={20}>
      <Container mb={20}>
        <Flex align={"center"} justify={"space-between"}>
          <Title color="white">Cart</Title>
          <CloseButton disabled={isLoading} title="Close sign in" size={"lg"} onClick={handleClose} />
        </Flex>
      </Container>

      {!cart && !orderPlaced ? (
        <Card>
          <Stack spacing={0}>
            <Text ta="center" size={50}>
              😭
            </Text>
            <Text ta="center">Cart is empty</Text>
          </Stack>
        </Card>
      ) : (
        <Container>
          <Stepper size="sm" active={active} breakpoint="sm">
            <Stepper.Step label="First step" description="Order details">
              <Text size="xl" fw="700" mb="sm">
                {cart?.header.restaurantName}
              </Text>

              {cart?.items.map(x => (
                <Card key={x.menuId} mb={5}>
                  <Flex gap="lg" align={"center"} justify={"space-between"}>
                    <Flex gap="sm" align="center">
                      <Text size="sm" color="orange" fw="900">
                        {x.quantity}x
                      </Text>
                      <Text size="sm" fw="700">
                        {x.name}
                      </Text>
                    </Flex>

                    <Flex gap="sm" align={"center"}>
                      <Text size="sm">{x.price} RON</Text>
                      <ActionIcon
                        color="orange"
                        size="md"
                        radius="xl"
                        variant="filled"
                        onClick={() => removeFromCart(x.menuId)}
                      >
                        <IconMinus />
                      </ActionIcon>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Stepper.Step>

            <Stepper.Step label="Second step" description="Order confirmation">
              <Stack>
                <TextInput
                  placeholder="Your address here"
                  label="Address"
                  {...form.getInputProps("address")}
                  withAsterisk
                />
                <NumberInput
                  min={1}
                  description={`Max distance is ${cart?.header.deliveryMaxDistance} km, you will be charged ${cart?.header.extraDeliveryFee} RON / extra km`}
                  placeholder="Distance in km"
                  label="Distance"
                  {...form.getInputProps("distance")}
                  withAsterisk
                />
                <Textarea placeholder="Optional mentions..." label="Mentions" {...form.getInputProps("mentions")} />

                <Card>
                  <Stack>
                    <Flex justify={"space-between"}>
                      <Text size="sm" color="dimmed">
                        Subtotal
                      </Text>
                      <Text size="sm" color="dimmed">
                        {subtotal} RON
                      </Text>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex justify={"space-between"}>
                      <Text size="sm" color="dimmed">
                        Delivery fee
                      </Text>
                      <Text size="sm" color="dimmed">
                        {cart?.header.deliveryPrice === 0 ? "Free" : `${cart?.header.deliveryPrice} RON`}
                      </Text>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex justify={"space-between"}>
                      <Text size="sm" color="dimmed">
                        Extra delivery fee
                      </Text>
                      <Text size="sm" color="dimmed">
                        {extraDeliveryFee.toFixed(2)} RON
                      </Text>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex justify={"space-between"}>
                      <Text size="sm" fw="700">
                        Order total
                      </Text>
                      <Text size="sm" fw="700">
                        {(subtotal! + deliveryPrice! + extraDeliveryFee).toFixed(2)} RON
                      </Text>
                    </Flex>
                  </Stack>
                </Card>

                {error !== "" && (
                  <Alert icon={<IconAlertCircle size="2rem" stroke={"3"} />} variant="filled" color="red">
                    <Text fw={700}>{error}</Text>
                  </Alert>
                )}
              </Stack>
            </Stepper.Step>

            <Stepper.Completed>
              <Center pt={20}>
                <Title>Order placed 🎉</Title>
              </Center>
            </Stepper.Completed>
          </Stepper>

          <Group position="right" mt="xl">
            {active < 2 && (
              <Button variant="default" onClick={prevStep} disabled={isLoading}>
                Back
              </Button>
            )}
            {active < 2 && (
              <Button onClick={nextStep} loading={isLoading}>
                {active === 1 ? "Place order" : "Next step"}
              </Button>
            )}
          </Group>
        </Container>
      )}
    </Container>
  );
};

export default CartModal;
