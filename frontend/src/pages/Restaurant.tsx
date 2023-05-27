import { Stack, Card, Title, Grid, Button, Loader, Center, Text, Badge, Flex, Tooltip } from "@mantine/core";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import { IconArrowLeft, IconCoins, IconMapPinPlus, IconMotorbike, IconRoad } from "@tabler/icons-react";
import { IMenu, IRestaurant } from "../interfaces/Restaurant";

const Restaurant = () => {
  const { id } = useParams();

  const { status, data } = useQuery<{
    restaurant: IRestaurant;
    menu: IMenu[];
  }>({
    retry: false,
    refetchOnWindowFocus: false,
    queryKey: ["restaurant", id],
    queryFn: getRestaurant,
  });

  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const opening = {
    h: Number(data?.restaurant.schedule[dayOfWeek].opening?.split(":")[0]),
    m: Number(data?.restaurant.schedule[dayOfWeek].opening?.split(":")[1]),
  };
  const closing = {
    h: Number(data?.restaurant.schedule[dayOfWeek].closing?.split(":")[0]),
    m: Number(data?.restaurant.schedule[dayOfWeek].closing?.split(":")[1]),
  };

  const openingTimeInMinutes = opening.h * 60 + opening.m;
  const closingTimeInMinutes = closing.h * 60 + closing.m;

  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const isOpen =
    !isNaN(openingTimeInMinutes) &&
    currentTimeInMinutes >= openingTimeInMinutes &&
    currentTimeInMinutes <= closingTimeInMinutes;

  function getRestaurant() {
    return axios
      .get<{ restaurant: IRestaurant; menu: IMenu[] }>(`http://localhost:8000/api/restaurants/${id}`)
      .then(res => res.data);
  }

  return (
    <Stack spacing={50} mt="lg">
      <Button component={Link} w={"fit-content"} to="/restaurants" leftIcon={<IconArrowLeft />} variant="subtle">
        Back to restaurants
      </Button>

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
          <div style={{ position: "relative", height: "50vh", overflow: "hidden" }}>
            <svg
              style={{ position: "absolute", top: "50%", transform: "translate(0, -50%) " }}
              viewBox="0 0 900 600"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <rect x="0" y="0" height="100%" fill="#001220"></rect>
              <path d={data.restaurant.d[0]} fill={!isOpen ? "#adb5bd" : data.restaurant.fill[2]}></path>
              <path d={data.restaurant.d[1]} fill={!isOpen ? "#868e96" : data.restaurant.fill[1]}></path>
              <path d={data.restaurant.d[2]} fill={!isOpen ? "#495057" : data.restaurant.fill[0]}></path>
            </svg>

            <Stack w="50%" spacing={"sm"} className="restaurant-card-title">
              <Title>{data.restaurant.name}</Title>

              <Flex w={"100%"} justify={"center"} wrap="wrap" gap="sm">
                <Tooltip label="Delivery price">
                  <Badge
                    py={14}
                    variant="filled"
                    color={!isOpen ? "gray" : data.restaurant.deliveryPrice === 0 ? "green" : "pink"}
                  >
                    <Flex w={"100%"} gap={5} align={"center"}>
                      <IconMotorbike />
                      {data.restaurant.deliveryPrice === 0 ? "Free" : `${data.restaurant.deliveryPrice} RON`}
                    </Flex>
                  </Badge>
                </Tooltip>

                <Tooltip label="Minimum order">
                  <Badge
                    py={14}
                    variant="filled"
                    color={!isOpen ? "gray" : data.restaurant.minimumOrder === 0 ? "green" : "pink"}
                  >
                    <Flex w={"100%"} gap={5} align={"center"}>
                      <IconCoins />
                      {data.restaurant.minimumOrder} RON
                    </Flex>
                  </Badge>
                </Tooltip>

                <Tooltip label="Delivery maximum distance">
                  <Badge color={!isOpen ? "gray" : "pink"} py={14} variant="filled">
                    <Flex w={"100%"} gap={5} align={"center"}>
                      <IconRoad />
                      {data.restaurant.deliveryMaxDistance} KM
                    </Flex>
                  </Badge>
                </Tooltip>

                <Tooltip label="Extra delivery fee">
                  <Badge color={!isOpen ? "gray" : "pink"} py={14} variant="filled">
                    <Flex w={"100%"} gap={5} align={"center"}>
                      <IconMapPinPlus />
                      {data.restaurant.extraDeliveryFee} RON / KM
                    </Flex>
                  </Badge>
                </Tooltip>
              </Flex>
            </Stack>
          </div>

          <Stack>
            <Title>Schedule</Title>

            <div className="schedule-container">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="schedule-item">
                  <Card w="100%" className={index === dayOfWeek ? "highlight" : ""}>
                    <Stack spacing={0}>
                      <Text ta="center" fw={700}>
                        {day}
                      </Text>
                      <Text ta="center">
                        {data.restaurant.schedule[index].opening === null
                          ? "Closed"
                          : `${data.restaurant.schedule[index].opening} - ${data.restaurant.schedule[index].closing}`}
                      </Text>
                    </Stack>
                  </Card>
                </div>
              ))}
            </div>
          </Stack>

          <Stack>
            <Title>Menu</Title>
            <Grid gutter={30}>
              {data.menu.map((item: IMenu) => (
                <Grid.Col key={item._id} xs={6} sm={4} md={4} lg={3}>
                  <MenuCard isOpen={isOpen} restaurant={data.restaurant} menu={item} />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Restaurant;
