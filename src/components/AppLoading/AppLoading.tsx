import { Center, Heading, Spinner, VStack } from "native-base";
import React from "react";

export default function AppLoading() {
  return (
    <Center h="full" w="full">
      <VStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading" size="lg" />
        <Heading fontSize="md">Loading</Heading>
      </VStack>
    </Center>
  );
}
