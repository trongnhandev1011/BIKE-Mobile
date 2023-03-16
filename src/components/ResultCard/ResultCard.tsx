import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Center, Heading, HStack, Stack, Text } from "native-base";

export default function SuccessfulModal({
  type,
  title,
  description,
  buttons: ButtonGroup,
}: {
  type: "success" | "error" | "warning";
  title: string;
  description: string;
  buttons?: any;
}) {
  const handleChooseIcon = (type: string) => {
    switch (type) {
      case "error":
        return <MaterialIcons name="error" size={72} color="red" />;
      case "warning":
        return <MaterialIcons name="warning" size={72} color="yellow" />;
      default:
        return <MaterialIcons name="check-circle" size={72} color="green" />;
    }
  };

  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      px="4"
      py="6"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 3,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <Center>
        {handleChooseIcon(type)}
        <Heading size="md" mt="5">
          {title}
        </Heading>
      </Center>
      <Stack p="4" space={3}>
        <Text fontWeight="400" textAlign="center">
          {description}
        </Text>
      </Stack>
      <HStack flexDirection="row" space={4} mt={3}>
        {ButtonGroup}
      </HStack>
    </Box>
  );
}
