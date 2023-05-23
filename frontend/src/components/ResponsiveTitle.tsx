import React from "react";
import { Title, TitleProps } from "@mantine/core";

const ResponsiveTitle = ({ children }: TitleProps) => {
  return <Title fz={{ base: "24px", xs: "32px", sm: "32px" }}>{children}</Title>;
};

export default ResponsiveTitle;
