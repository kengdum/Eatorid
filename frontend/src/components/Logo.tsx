import React from "react";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

interface LogoProps {
  width?: number;
}

const Logo = ({ width }: LogoProps) => {
  return (
    <Link to="/">
      <Image width={width || 100} src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;
