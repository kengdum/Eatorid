import { AppShell, Image, Button, Flex, Header, Stack, Container } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useUI } from "../contexts/UIContext";

export function Layout() {
  const { setShowModal } = useUI();

  return (
    <AppShell
      header={
        <Header height={70} py="xs" px={100}>
          <Flex align={"center"} justify={"space-between"}>
            <Logo />

            <Button className="text" onClick={() => setShowModal("signin")}>
              Sign in
            </Button>
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
