import { Box, Center, HStack, Image, Text, Flex, VStack } from "native-base";
import React from "react";
import { Vehicle } from "../../services/backend/UserController/type";

interface IProps {
  data?: Vehicle;
}

export default function VehicleCard({ data }: IProps) {
  if (!data) return null;

  return (
    <Center
      backgroundColor={"white"}
      rounded="lg"
      py="6"
      px="4"
      w="full"
      shadow="2"
    >
      <Text fontSize="lg" fontWeight="semibold">
        {`Vehicle card: ${data.type}`}
      </Text>
      <Image
        my="4"
        rounded="full"
        alt="create post"
        source={{
          uri: `https://s3-ap-southeast-1.amazonaws.com${data.image}`,
        }}
        size="xl"
      />
      <Text fontSize="xl">{data.licencePlate}</Text>
      <VStack w="full" px="4" mt="6" space="2">
        <Flex justifyContent="space-between" direction="row">
          <Text fontSize="lg">
            <Text fontWeight="semibold">Brand:</Text> {data.brand}
          </Text>
          <Text fontSize="lg">
            <Text fontWeight="semibold">Color:</Text> {data.color}
          </Text>
        </Flex>
        <Text fontSize="lg">
          <Text fontWeight="semibold">Desc:</Text> {data.description}
        </Text>
        <Text fontSize="lg">
          <Text fontWeight="semibold">Status:</Text> {data.status}
        </Text>
      </VStack>
    </Center>
  );
}
