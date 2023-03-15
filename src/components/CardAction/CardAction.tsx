import { Box, Center, Flex, Image, Text } from "native-base";
import React from "react";
import { GestureResponderEvent, Pressable } from "react-native";

type CardAction = {
  image: {
    url: string;
    fallback?: any;
  };
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function CardAction({ image, title, onPress }: CardAction) {
  return (
    <Pressable onPress={onPress}>
      <Center backgroundColor="white" rounded="xl" p="6" shadow="3">
        <Box rounded="full">
          <Image
            rounded="full"
            alt="create post"
            source={{
              uri: image.url,
            }}
            size="lg"
            fallbackElement={image.fallback}
          />
        </Box>
        <Text mt="4" fontSize="sm" fontWeight="semibold">
          {title}
        </Text>
      </Center>
    </Pressable>
  );
}
