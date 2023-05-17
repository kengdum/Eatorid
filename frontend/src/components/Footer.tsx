import React from "react";
import Logo from "./Logo";
import { Flex, Group, ActionIcon, Text } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";

const Footer = () => {
  return (
    <Flex justify={"space-between"} align={"center"} py={10}>
      <Logo width={80} />

      <Text size={"sm"}>Delivering since 2023</Text>

      <Group spacing={0} noWrap>
        <ActionIcon size="lg">
          <IconBrandTwitter size="1.05rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon size="lg">
          <IconBrandYoutube size="1.05rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon size="lg">
          <IconBrandInstagram size="1.05rem" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Flex>
  );
};

export default Footer;
