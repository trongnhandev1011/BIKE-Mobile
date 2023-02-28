import { Center, HStack, Skeleton, VStack } from "native-base";
import React from "react";

export default function NotificationCardSkeleton() {
  return (
    <Center w="full">
      <HStack
        w="full"
        px="4"
        py="6"
        space="2"
        borderWidth="1"
        rounded="lg"
        backgroundColor="white"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <VStack flex="1">
          <Skeleton h="12" w="12" rounded="full" />
        </VStack>
        <VStack flex="4" space="4">
          <Skeleton.Text />
        </VStack>
      </HStack>
    </Center>
  );
}
