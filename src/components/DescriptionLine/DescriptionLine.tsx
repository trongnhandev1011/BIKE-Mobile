import { Text } from "native-base";
import React from "react";

const DescriptionLine = ({
  title,
  description,
  fontSize = "md",
  fontWeight = "bold",
}: {
  title: string;
  description: string;
  fontSize?: string;
  fontWeight?: string;
}) => {
  return (
    <Text fontSize={fontSize}>
      <Text fontSize={fontSize} fontWeight={fontWeight}>
        {title}
      </Text>
      {": "}
      {description}
    </Text>
  );
};

export default DescriptionLine;
