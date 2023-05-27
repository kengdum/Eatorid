import { Button, Flex } from "@mantine/core";

import { useUI } from "../contexts/UIContext";

export function NavbarUserNotAuthenticated() {
  const { setShowModal } = useUI();

  return (
    <Flex gap={10}>
      <Button variant="subtle" className="text" onClick={() => setShowModal("signin")}>
        Sign in
      </Button>

      <Button className="text" onClick={() => setShowModal("signup")}>
        Sign up
      </Button>
    </Flex>
  );
}
