import React from "react";
import Logo from "./Logo";
import { Flex, Group, ActionIcon, Text } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";

const Footer = () => {
  const doomed: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  return (
    <Flex justify={"space-between"} align={"center"} py={10}>
      <Logo width={80} />

      <Text ta={"center"} size={"xs"}>
        Delivering since 2023
      </Text>

      <Group spacing={0} noWrap>
        <ActionIcon component="a" href="https://twitter.com/eat_or_yeet" size={40} onClick={doomed}>
          <IconBrandTwitter size="1.35rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon component="a" href="https://www.youtube.com/@EatOrYeet" size={40} onClick={doomed}>
          <IconBrandYoutube size="1.35rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon component="a" href="https://www.instagram.com/EatOrYeet" size={40} onClick={doomed}>
          <IconBrandInstagram size="1.35rem" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Flex>
  );
};

export default Footer;
