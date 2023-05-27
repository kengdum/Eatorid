import { AppShell, Flex, Header, Stack, Container } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";
import { NavbarUserAuthenticated } from "../components/NavbarUserAuthenticated";
import { NavbarUserNotAuthenticated } from "../components/NavbarUserNotAuthenticated";

export function Layout() {
  const { user } = useAuth();

  return (
    <AppShell
      header={
        <Header height={70}>
          <Container h={"100%"} size={"90%"}>
            <Flex h={"100%"} align={"center"} justify={"space-between"}>
              <Logo />

              {user ? <NavbarUserAuthenticated /> : <NavbarUserNotAuthenticated />}
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
