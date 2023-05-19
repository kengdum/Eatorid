import { List, Center, Grid, Image, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import hero from "../assets/hero.gif";

const HomeFeaturesSection = () => {
  return (
    <Center h={"100%"} py={"5%"}>
      <Grid grow>
        <Grid.Col sm={6} lg={4}>
          <Center h={"100%"}>
            <Stack spacing={30}>
              <Text fz={18}>
                Delicious meals delivered to your doorstep. Order from a wide selection of restaurants and enjoy
                convenient and hassle-free food delivery.
              </Text>

              <List
                spacing="xl"
                size="md"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Extensive restaurant selection</b> – Access a vast array of restaurants offering a diverse range of
                  cuisines, ensuring there's something to satisfy every craving.
                </List.Item>
                <List.Item>
                  <b>User-friendly ordering process</b> – Enjoy a seamless and intuitive ordering experience, allowing
                  you to effortlessly browse menus, customize your meals, and complete transactions with just a few
                  taps.
                </List.Item>
                <List.Item>
                  <b>Real-time order tracking</b> – Stay updated on the status of your delivery with live order
                  tracking. From preparation to delivery, know exactly when your food will arrive at your doorstep.
                </List.Item>
              </List>
            </Stack>
          </Center>
        </Grid.Col>

        <Grid.Col p={"5%"} sm={3} lg={2}>
          <Center h={"100%"}>
            <Image alt="Hero" width={"100%"} maw={"400px"} src={hero} withPlaceholder />
          </Center>
        </Grid.Col>
      </Grid>
    </Center>
  );
};

export default HomeFeaturesSection;
