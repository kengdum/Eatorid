import {
  AppShell,
  Image,
  Button,
  Flex,
  Header,
  Stack,
  Container,
  LoadingOverlay,
  Box,
  Menu,
  Avatar,
  Text,
  ActionIcon,
  Indicator,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import { IconLogout, IconReceipt, IconShoppingCart, IconSkull, IconTrash, IconUser } from "@tabler/icons-react";

export function Layout() {
  const { setShowModal } = useUI();
  const { user, logout } = useAuth();

  const doomed = () => {
    window.location.href = "https://youtu.be/dQw4w9WgXcQ";
  };

  return (
    <AppShell
      header={
        <Header height={70} py="xs" px={100}>
          <Flex align={"center"} justify={"space-between"}>
            <Logo />

            {user ? (
              <Flex gap="md">
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon size={"xl"} radius="xl" variant="outline">
                      <IconUser />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Box p={"sm"}>
                      <Text>
                        Hello{" "}
                        <Text fw={"700"} span>
                          {user.name}
                        </Text>
                      </Text>
                    </Box>

                    <Menu.Item icon={<IconReceipt size={20} />}>Orders</Menu.Item>

                    <Menu.Divider />

                    <Menu.Item icon={<IconLogout size={20} style={{ transform: "rotate(180deg)" }} />} onClick={logout}>
                      Logout
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>

                    <Menu.Item color="red" icon={<IconSkull size={20} />} onClick={doomed}>
                      DO NOT CLICK!
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Indicator inline offset={7} position="bottom-end" withBorder label="5" size={26}>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon size={"xl"} radius="xl" variant="outline">
                        <IconShoppingCart />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Box p={"sm"}>
                        <Text>
                          Hello{" "}
                          <Text fw={"700"} span>
                            {user.name}
                          </Text>
                        </Text>
                      </Box>

                      <Menu.Item icon={<IconReceipt size={20} />}>Orders</Menu.Item>

                      <Menu.Divider />

                      <Menu.Item
                        icon={<IconLogout size={20} style={{ transform: "rotate(180deg)" }} />}
                        onClick={logout}
                      >
                        Logout
                      </Menu.Item>

                      <Menu.Divider />

                      <Menu.Label>Danger zone</Menu.Label>

                      <Menu.Item color="red" icon={<IconSkull size={20} />} onClick={doomed}>
                        DO NOT CLICK!
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Indicator>
              </Flex>
            ) : (
              <Flex gap={10}>
                <Button variant="subtle" className="text" onClick={() => setShowModal("signin")}>
                  Sign in
                </Button>

                <Button className="text" onClick={() => setShowModal("signup")}>
                  Sign up
                </Button>
              </Flex>
            )}
          </Flex>
        </Header>
      }
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container h={"100%"} size={"80%"}>
        <Stack h={"100%"} spacing={"sm"}>
          <Container size={"100%"} w={"100%"} style={{ flexGrow: 1 }}>
            <Outlet />
          </Container>
          <Footer />
        </Stack>
      </Container>
    </AppShell>
  );
}
