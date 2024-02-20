import React from "react";
import Logo from "./Logo";
import { Flex, Group, ActionIcon } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";

const Footer = () => {
  const doomed: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    window.location.href = ""
  };

  return (
    <Flex justify={"space-between"} align={"center"} py={10}>
      <Logo width={80} />

      <Group spacing={0} noWrap>
        <ActionIcon color="black" component="a" href="https://twitter.com/eat_or_yeet" size={40} onClick={doomed}>
          <IconBrandTwitter size="2.35rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="black" component="a" href="https://www.youtube.com/@EatOrYeet" size={40} onClick={doomed}>
          <IconBrandYoutube size="2.35rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="black" component="a" href="https://www.instagram.com/EatOrYeet" size={40} onClick={doomed}>
          <IconBrandInstagram size="2.35rem" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Flex>
  );
};

export default Footer;
