import { Avatar, Box, Center, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { AppLoading } from "../../components/AppLoading";
import { VehicleCardComponent } from "../../components/VehicleCard";
import { getMyVehicleAPI } from "../../services/backend/UserController";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ErrorContext } from "../ErrorProvider/ErrorProvider";

export default function VehicleCard() {
  const { setErrorMsg } = useContext(ErrorContext);
  const navigation = useNavigation();
  const {
    isLoading,
    data: vehicleData,
    refetch,
    isError,
    error,
  } = useQuery("myVehicleCard", async () => {
    const res = (await getMyVehicleAPI()).data;
    console.log(res);
    if (res.code === 61) {
      return null;
    }
    if (res.code !== 0) {
      throw res;
    }
    return res.data;
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  if (isError) {
    const e = error as any;
    setErrorMsg({
      code: e?.code ?? -1,
      message: e?.message ?? "Unexpected error. Please try again later.",
    });
    navigation.goBack();
  }

  if (isLoading) return <AppLoading />;

  return (
    <>
      {!vehicleData ? (
        <Center>
          <Center backgroundColor="#33B565" w="150" h="150" rounded="full">
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
