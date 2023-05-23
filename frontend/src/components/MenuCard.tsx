import { Card, Stack, Title, Flex, Badge, Image, Text, UnstyledButton, Group, ActionIcon } from "@mantine/core";
import React from "react";
import { IconMotorbike, IconCoins, IconPlus, IconMinus } from "@tabler/icons-react";
import img from "../assets/1_png.png";
import { Link } from "react-router-dom";
import { IRestaurant, IMenu } from "../interfaces/Restaurant";
import { useCart } from "../contexts/CartContext";

interface MenuCardProps {
  isOpen: boolean;
  menu: IMenu;
  restaurant: IRestaurant;
}

const MenuCard = ({ isOpen, restaurant, menu }: MenuCardProps) => {
  const { cart, removeFromCart, addToCart } = useCart();

  const cartItem = cart?.items.find(x => x.menuId === menu._id);

  return (
    <Card className={cartItem ? "menu-highlight" : ""} p="lg" h={"100%"}>
      <Flex h="100%" direction={"column"} justify={"space-between"}>
        <Stack>
          <Title order={3}>{menu.name}</Title>

          <Text size="sm" color="dimmed">
            {menu.description}
          </Text>
        </Stack>

        <Flex mt="md" align={"center"} justify={"space-between"}>
          <Text fw="700" color="pink">
            {menu.price} RON
          </Text>

          <Flex gap="md">
            {cartItem && (
              <>
                <ActionIcon
                  color="pink"
                  size="md"
                  radius="xl"
                  variant="filled"
                  onClick={() => removeFromCart(menu._id)}
                >
                  <IconMinus />
                </ActionIcon>

                <Text fw="700">{cartItem.quantity}</Text>
              </>
            )}

            <ActionIcon
              color="pink"
              size="md"
              radius="xl"
              variant="filled"
              onClick={() =>
                addToCart(
                  {
                    restaurantId: restaurant._id,
                    restaurantName: restaurant.name,
                    minimumOrder: restaurant.minimumOrder,
                    deliveryMaxDistance: restaurant.deliveryMaxDistance,
                    deliveryPrice: restaurant.deliveryPrice,
                    extraDeliveryFee: restaurant.extraDeliveryFee,
                  },
                  { menuId: menu._id, name: menu.name, price: menu.price, quantity: 1, mentions: "" }
                )
              }
            >
              <IconPlus />
            </ActionIcon>
          </Flex>

          {/* {isOpen && (
            <Flex gap="md">
              {cartItem && (
                <>
                  <ActionIcon color="pink" size="md" radius="xl" variant="filled" onClick={() => removeFromCart(menu)}>
                    <IconMinus />
                  </ActionIcon>

                  <Text fw="700">{cartItem.quantity}</Text>
                </>
              )}

              <ActionIcon color="pink" size="md" radius="xl" variant="filled" onClick={() => addToCart(menu)}>
                <IconPlus />
              </ActionIcon>
            </Flex>
          )} */}
        </Flex>
      </Flex>
    </Card>
  );
};

export default MenuCard;
