import { Card, Stack, Title, Flex, Badge, Image, UnstyledButton, Group } from "@mantine/core";
import React from "react";
import { IconMotorbike, IconCoins } from "@tabler/icons-react";
import img from "../assets/1_png.png";
import { Link } from "react-router-dom";
import { IRestaurant } from "../interfaces/Restaurant";

interface RestaurantCardProps {
  restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const opening = {
    h: Number(restaurant.schedule[dayOfWeek].opening?.split(":")[0]),
    m: Number(restaurant.schedule[dayOfWeek].opening?.split(":")[1]),
  };
  const closing = {
    h: Number(restaurant.schedule[dayOfWeek].closing?.split(":")[0]),
    m: Number(restaurant.schedule[dayOfWeek].closing?.split(":")[1]),
  };

  const openingTimeInMinutes = opening.h * 60 + opening.m;
  const closingTimeInMinutes = closing.h * 60 + closing.m;

  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const isOpen =
    !isNaN(openingTimeInMinutes) &&
    currentTimeInMinutes >= openingTimeInMinutes &&
    currentTimeInMinutes <= closingTimeInMinutes;

  return (
    <UnstyledButton component={Link} to={`/restaurants/${restaurant._id.toString()}`} w={"100%"}>
      <Card p="sm" className="test">
        <Card.Section style={{ position: "relative" }}>
          <svg className="visual" viewBox="0 0 900 600" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <rect x="0" y="0" height="100%" fill="#001220"></rect>
            <path d={restaurant.d[0]} fill={!isOpen ? "#adb5bd" : restaurant.fill[2]}></path>
            <path d={restaurant.d[1]} fill={!isOpen ? "#868e96" : restaurant.fill[1]}></path>
            <path d={restaurant.d[2]} fill={!isOpen ? "#495057" : restaurant.fill[0]}></path>
          </svg>

          <Title order={2} className="restaurant-card-title">
            {restaurant.name}
          </Title>
        </Card.Section>

        <Card.Section p={"8%"} style={{ position: "relative" }}>
          <Stack>
            <Flex gap={"xs"}>
              <Badge
                py={14}
                fullWidth
                variant="filled"
                color={!isOpen ? "gray" : restaurant.deliveryPrice === 0 ? "green" : "pink"}
              >
                <Flex w={"100%"} gap={5} align={"center"}>
                  <IconMotorbike />
                  {restaurant.deliveryPrice === 0 ? "Free" : `${restaurant.deliveryPrice} RON`}
                </Flex>
              </Badge>

              <Badge
                py={14}
                fullWidth
                variant="filled"
                color={!isOpen ? "gray" : restaurant.minimumOrder === 0 ? "green" : "pink"}
              >
                <Flex w={"100%"} gap={5} align={"center"}>
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
