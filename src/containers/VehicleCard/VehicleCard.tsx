import { Avatar, Box, Center, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useQuery } from "react-query";
import { AppLoading } from "../../components/AppLoading";
import { VehicleCardComponent } from "../../components/VehicleCard";
import { getMyVehicleAPI } from "../../services/backend/UserController";

export default function VehicleCard() {
  const {
    isLoading,
    data: vehicleData,
    error,
  } = useQuery("myVehicle", async () => {
    const res = (await getMyVehicleAPI()).data;
    return res.data;
  });

  if (isLoading) return <AppLoading />;

  return (
    <>
      {!vehicleData ? (
        <Center>
          <Center backgroundColor={"indigo.500"} w="150" h="150" rounded="full">
            <MaterialCommunityIcons name="motorbike" size={100} color="white" />
          </Center>
          <Text fontSize="lg" mt="5" fontWeight="semibold">
            You haven't registered vehicle
          </Text>
        </Center>
      ) : (
        <VehicleCardComponent data={vehicleData} />
      )}
    </>
  );
}
