import { useRoute } from "@react-navigation/native";
import { Center, ScrollView, VStack } from "native-base";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { AppLoading } from "../../components/AppLoading";
import { getTripDetailAPI } from "../../services/backend/TripsController";
import { TripDetail } from "../../services/backend/TripsController/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import {
  TripFeedbackCard,
  TripLocationCard,
  TripPartnerCard,
  TripSummaryCard,
} from "./InformationElements";
import { TripActionForBiker, TripActionForPassenger } from "./ActionElements";

export type TripDetailScreenProps = {};

interface IRouteParams {
  tripId: number;
}

export default function TripDetailScreen() {
  const route = useRoute();
  const { user } = useAuth();

  const { tripId } = route?.params as IRouteParams;
  const {
    isLoading,
    data: tripData,
    refetch,
    error,
  } = useQuery(["tripDetail", tripId], async () => {
    const res = (await getTripDetailAPI(tripId)).data;
    return res.data;
  });

  if (isLoading) return <AppLoading />;

  return (
    <ScrollView h="full" w="full" px="4" py="8">
      <Center mb="6">
        <Center backgroundColor={"indigo.500"} rounded="full" h="40" w="40">
          <MaterialCommunityIcons name="motorbike" size={100} color="white" />
        </Center>
      </Center>
      <VStack space="4" pb="12">
        <TripLocationCard tripData={tripData as TripDetail} />
        <TripSummaryCard tripData={tripData as TripDetail} />
        <TripPartnerCard
          user={
            tripData?.grabber?.id == user!.id
              ? tripData?.passenger
              : tripData?.grabber
          }
          role={tripData?.grabber?.id == user!.id ? "Passenger" : "Grabber"}
        />
        {tripData?.feedbackPoint != null ||
        tripData?.feedbackPoint != undefined ? (
          <TripFeedbackCard tripData={tripData as TripDetail} />
        ) : null}
        {(user!.id as string) == tripData?.grabber.id ? (
          <TripActionForBiker
            tripData={tripData as TripDetail}
            refetchData={refetch}
          />
        ) : (
          <TripActionForPassenger
            tripData={tripData as TripDetail}
            refetchData={refetch}
          />
        )}
      </VStack>
    </ScrollView>
  );
}
