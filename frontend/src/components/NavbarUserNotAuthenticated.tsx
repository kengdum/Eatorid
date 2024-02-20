import { Button, Flex, Text } from "@mantine/core";

import { useUI } from "../contexts/UIContext";

export function NavbarUserNotAuthenticated() {
  const { setShowModal } = useUI();

  return (
    <Flex gap={10}>
      <Button variant="subtle" className="text" onClick={() => setShowModal("signin")}>
        <Text color="white">Sign in</Text>
      </Button>

      <Button className="text" onClick={() => setShowModal("signup")}>
        Sign up
      </Button>
    </Flex>
  );
}
