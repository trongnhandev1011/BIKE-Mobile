import { useRoute } from "@react-navigation/native";
import { Center, Text } from "native-base";
import React from "react";

export type TripDetailScreenProps = {};

export default function TripDetailScreen() {
  const route = useRoute();

  return (
    <Center h="full" w="full">
      {/* @ts-ignore */}
      <Text>Trip detail Screen: {route?.params?.tripId as string}</Text>
    </Center>
  );
}
