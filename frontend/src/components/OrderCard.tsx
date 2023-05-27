import {
  Card,
  Accordion,
  Timeline,
  Flex,
  Badge,
  Stack,
  Text,
  Center,
  Blockquote,
  Loader,
  Stepper,
} from "@mantine/core";
import React from "react";
import {
  IconMotorbike,
  IconCoins,
  IconPlus,
  IconMinus,
  IconPin,
  IconMapPin,
  IconRoad,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessage2,
  IconMessage2Exclamation,
} from "@tabler/icons-react";
import img from "../assets/1_png.png";
import { Link } from "react-router-dom";
import { IRestaurant, IMenu } from "../interfaces/Restaurant";
import { useCart } from "../contexts/CartContext";
import { IOrder } from "../interfaces/Order";
import { IconMessageDots } from "@tabler/icons-react";

interface MenuCardProps {
  order: IOrder;
}

const OrderCard = ({ order }: MenuCardProps) => {
  const totalItems = order.items.reduce((acc, item) => item.quantity + acc, 0);
  const subtotal = order.items.reduce((acc, item) => item.quantity * item.price + acc, 0);

  const statuses = ["confirming", "preparing", "delivering", "rejected", "completed"];

  return (
    <Center>
      <Card p="0" h={"100%"} w={"100%"}>
        <Accordion p="0">
          <Accordion.Item value="order-details">
            <Accordion.Control>
              <Flex align={"center"} justify={"space-between"}>
                <Stack spacing={0}>
                  <Text size="xs">{new Date(order.createdAt).toLocaleDateString()}</Text>
                  <Text fw={700} size="xl">
                    {order.restaurantName} -{" "}
                    <Text span color="pink">
                      {totalItems} items
                    </Text>
                  </Text>
                </Stack>

                {order.status === "completed" ? (
                  <Badge color="green" variant="filled" size="lg">
                    Completed
                  </Badge>
                ) : order.status === "rejected" ? (
                  <Badge color="red" variant="filled" size="lg">
                    Rejected
                  </Badge>
                ) : (
                  <Text>
                    <Loader variant="dots" /> {statuses[statuses.indexOf(order.status)]}
                  </Text>
                )}
              </Flex>
            </Accordion.Control>

            <Accordion.Panel p="0">
              <Stack>
                {order.status !== "rejected" && (
                  <Stepper active={statuses.indexOf(order.status)} breakpoint="sm">
                    <Stepper.Step
                      icon={<Loader variant="dots" size={"sm"} />}
                      label="Confirming"
                      description={statuses.indexOf(order.status) > 0 ? "Order confirmed" : "Waiting for confirmation"}
                    ></Stepper.Step>

                    <Stepper.Step
                      icon={statuses.indexOf(order.status) === 1 ? <Loader variant="dots" size={"sm"} /> : null}
                      label="Preparing"
                      description={
                        statuses.indexOf(order.status) > 1
                          ? "Your order is prepared"
                          : statuses.indexOf(order.status) === 1
                          ? "Order is being prepared"
                          : "Not started"
                      }
                    ></Stepper.Step>

                    <Stepper.Step
                      icon={statuses.indexOf(order.status) === 2 ? <Loader variant="dots" size={"sm"} /> : null}
                      label="Delivering"
                      description={
                        statuses.indexOf(order.status) > 2
                          ? "Delivered"
                          : statuses.indexOf(order.status) === 2
                          ? "Delivering in progress"
                          : "Not started"
                      }
                    ></Stepper.Step>

                    <Stepper.Step
                      label="Completed"
                      description={
                        statuses.indexOf(order.status) > 3
                          ? "Nice"
                          : statuses.indexOf(order.status) === 3
                          ? "Delivering in progress"
                          : "Almost there"
                      }
                    ></Stepper.Step>
                  </Stepper>
                )}

                {order.mentions && (
                  <Blockquote cite="– Your mention" icon={<IconMessage2Exclamation color="gray" size="1.5rem" />}>
                    {order.mentions}
                  </Blockquote>
                )}

                <Flex align={"center"} justify={"space-between"} gap="lg">
                  <Text>
                    <Flex gap="5px" align="center">
                      <IconMapPin />
                      {order.address}
                    </Flex>
                  </Text>
                  <Text>
                    <Flex gap="5px" align="center">
                      <IconRoad />
                      {order.distance} km
                    </Flex>
                  </Text>
                </Flex>

                <div>
                  {order.items.map(item => (
                    <Card style={{ backgroundColor: "#303138" }} key={item._id} mb={2}>
                      <Flex gap="lg" align={"center"} justify={"space-between"}>
                        <Flex gap="sm" align="center">
                          <Text size="sm" color="pink" fw="900">
                            {item.quantity}x
                          </Text>
                          <Text size="sm" fw="700">
                            {item.name}
                          </Text>
                        </Flex>

                        <Flex gap="sm" align={"center"}>
                          <Text fw={"700"} size="sm">
                            {item.price} RON
                          </Text>
                        </Flex>
                      </Flex>
                    </Card>
                  ))}
                </div>

                <div>
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
                        {order.deliveryFee === 0 ? "Free" : `${order.deliveryFee} RON`}
                      </Text>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex justify={"space-between"}>
                      <Text size="sm" color="dimmed">
                        Extra delivery fee
                      </Text>
                      <Text size="sm" color="dimmed">
                        {order.extraDeliveryFee.toFixed(2)} RON
                      </Text>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex justify={"space-between"}>
                      <Text size="sm" fw="700">
                        Order total
                      </Text>
                      <Text size="sm" fw="700">
                        {(subtotal + order.deliveryFee + order.extraDeliveryFee).toFixed(2)} RON
                      </Text>
                    </Flex>
                  </Stack>
                </div>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card>
    </Center>
  );
};

export default OrderCard;
