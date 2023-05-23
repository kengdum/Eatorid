import React from "react";
import { Text, TextProps } from "@mantine/core";

const ResponsiveText = ({ children }: TextProps) => {
  return (
    <Text fz={{ base: "2px", xs: "12px", sm: "80px", md: "80px", lg: "140px", xl: "140px" }} color="lime">
      {children}
    </Text>
  );
};

export default ResponsiveText;
