import { Card, Stack, Title, Flex, Text, ActionIcon } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
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
          <Text fw="700" color="orange">
            {menu.price} RON
          </Text>

          {isOpen && (
            <Flex gap="md">
              {cartItem && (
                <>
                  <ActionIcon
                    color="orange"
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
                color="orange"
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
                    { menuId: menu._id, name: menu.name, price: menu.price, quantity: 1 }
                  )
                }
              >
                <IconPlus />
              </ActionIcon>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default MenuCard;
