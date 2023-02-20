import { Text } from "native-base";
import React from "react";

const DescriptionLine = ({
  title,
  description,
  fontSize = "md",
}: {
  title: string;
  description: string;
  fontSize?: string;
}) => {
  return (
    <Text fontSize={fontSize}>
      <Text fontSize={fontSize} bold>
        {title}
      </Text>
      {": "}
      {description}
    </Text>
  );
};

export default DescriptionLine;
