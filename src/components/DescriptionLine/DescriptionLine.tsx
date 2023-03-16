import { Text } from "native-base";
import React from "react";

const DescriptionLine = ({
  title,
  description,
  fontSize = "md",
  fontWeight = "bold",
  isTruncated = false,
}: {
  title: string;
  description: string;
  fontSize?: string;
  fontWeight?: string;
  isTruncated?: boolean;
}) => {
  return (
    <Text fontSize={fontSize} isTruncated={isTruncated}>
      <Text fontSize={fontSize} fontWeight={fontWeight}>
        {title}
      </Text>
      {": "}
      {description}
    </Text>
  );
};

export default DescriptionLine;
