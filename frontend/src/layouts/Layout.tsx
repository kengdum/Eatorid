import {
  AppShell,
  Button,
  Flex,
  Header,
  Stack,
  Container,
  Box,
  Menu,
  Text,
  ActionIcon,
  Indicator,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import { IconLogout, IconReceipt, IconShoppingCart, IconSkull, IconUser } from "@tabler/icons-react";

export function Layout() {
  const { setShowModal } = useUI();
  const { user, logout } = useAuth();

  return (
    <AppShell
      header={
        <Header height={70}>
          <Container h={"100%"} size={"90%"}>
            <Flex h={"100%"} align={"center"} justify={"space-between"}>
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

                      <Menu.Item
                        icon={<IconLogout size={20} style={{ transform: "rotate(180deg)" }} />}
                        onClick={logout}
                      >
                        Logout
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
          </Container>
        </Header>
      }
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container h={"100%"} size={"100%"} px={"5%"} style={{ backgroundColor: "transparent" }}>
        <Stack h={"100%"}>
          <Container size={"100%"} w={"100%"} p={0} style={{ flexGrow: 1 }}>
            <Outlet />
          </Container>
          <Footer />
        </Stack>
      </Container>
    </AppShell>
  );
}
