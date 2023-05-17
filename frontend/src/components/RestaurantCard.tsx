import { Card, Stack, Title, Flex, Badge, Image, UnstyledButton } from "@mantine/core";
import { Restaurant } from "../../../interfaces/Restaurant";
import React from "react";
import { IconMotorbike, IconCoins } from "@tabler/icons-react";
import img from "../assets/1_png.png";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <UnstyledButton w={"100%"} onClick={() => alert(restaurant.id)}>
      <Card withBorder padding="lg">
        <Card.Section style={{ position: "relative" }}>
          <Image className="restaurant-card-image" src={img} alt="Restaurant image" height="200" />
          <Title className="restaurant-card-title">{restaurant.name}</Title>
        </Card.Section>

        <Card.Section p={20}>
          <Stack>
            <Flex gap={"md"}>
              <Badge size={"lg"} w="100%" color={restaurant.deliveryPrice === 0 ? "green" : "blue"}>
                <Flex w={"100%"} gap="sm" align={"center"}>
                  <IconMotorbike />
                  {restaurant.deliveryPrice === 0 ? "Free" : `${restaurant.deliveryPrice} RON`}
                </Flex>
              </Badge>

              <Badge size={"lg"} w="100%" color={restaurant.minimumOrder === 0 ? "green" : "blue"}>
                <Flex w={"100%"} gap="sm" align={"center"}>
                  <IconCoins />
                  {restaurant.minimumOrder} RON
                </Flex>
              </Badge>
            </Flex>
          </Stack>
        </Card.Section>
      </Card>
    </UnstyledButton>
  );
};

export default RestaurantCard;
