import React from "react";
import { Image, Text, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/logoSvg.svg";

interface LogoProps {
  width?: number;
}

const Logo = ({ width }: LogoProps) => {
  return (
    <Link to="/">
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Image width={width || 65} src={logo} title="logo.svg" alt="Logo" />
        <Text color="orange" size="lg" fw={700}>Eatorid</Text>
      </Flex>
    </Link>
  );
};

export default Logo;
