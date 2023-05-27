import { Flex, Box, Menu, Text, ActionIcon, Indicator } from "@mantine/core";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import {
  IconCodeCircle,
  IconLogout,
  IconReceipt,
  IconSdk,
  IconShoppingCart,
  IconTags,
  IconUser,
} from "@tabler/icons-react";
import { useCart } from "../contexts/CartContext";

export function NavbarUserAuthenticated() {
  const { setShowModal } = useUI();
  const { user, logout } = useAuth();
  const { cart, setOrderPlaced } = useCart();

  const totalItems = cart?.items.reduce((acc, item) => item.quantity + acc, 0);

  const doomed: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  const hadleCartClick = () => {
    setOrderPlaced(false);
    setShowModal("cart");
  };

  return (
    <Flex gap="md">
      <ActionIcon size="xl" radius="xl" variant="filled" color="pink" onClick={() => setShowModal("dev")}>
        <IconCodeCircle />
      </ActionIcon>

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
                {user!.name}
              </Text>
            </Text>
          </Box>

          <Link to="/orders">
            <Menu.Item icon={<IconReceipt size={20} />}>Orders</Menu.Item>
          </Link>
          <Link to="/promocode" onClick={doomed}>
            <Menu.Item icon={<IconTags size={20} />}>Promocode</Menu.Item>
          </Link>

          <Menu.Divider />

          <Menu.Item icon={<IconLogout size={20} style={{ transform: "rotate(180deg)" }} />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Indicator inline offset={7} position="bottom-end" disabled={!cart} withBorder label={totalItems} size={26}>
        <ActionIcon size={"xl"} radius="xl" variant="outline" onClick={hadleCartClick}>
          <IconShoppingCart />
        </ActionIcon>
      </Indicator>
    </Flex>
  );
}
