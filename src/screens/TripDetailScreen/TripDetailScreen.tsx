import { useNavigation, useRoute } from "@react-navigation/native";
import { Center, ScrollView, VStack } from "native-base";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { AppLoading } from "../../components/AppLoading";
import { getTripDetailAPI } from "../../services/backend/TripsController";
import { TripDetail } from "../../services/backend/TripsController/type";
import useAuth from "../../hooks/useAuth";
import {
  TripFeedbackCard,
  TripLocationCard,
  TripPartnerCard,
  TripSummaryCard,
} from "./InformationElements";
import { TripActionForBiker, TripActionForPassenger } from "./ActionElements";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";
import { NotificationContext } from "../../containers/NotificationProvider/NotificationProvider";
import MapContainer from "../../containers/MapContainer";

export type TripDetailScreenProps = {};

interface IRouteParams {
  tripId: number;
}

export default function TripDetailScreen() {
  const route = useRoute();
  const { user } = useAuth();
  const { setErrorMsg } = useContext(ErrorContext);
  const navigation = useNavigation();

  const { tripId } = route?.params as IRouteParams;
  const {
    isLoading,
    data: tripData,
    refetch,
    isError,
    error,
  } = useQuery(["tripDetail", tripId], async () => {
    const res = (await getTripDetailAPI(tripId)).data;
    if (res.code !== 0) {
      throw res;
    }
    return res.data;
  });

  const { notification } = useContext(NotificationContext);

  useEffect(() => {
    refetch();
  }, [notification]);

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
    <ScrollView h="full" w="full" px="4" py="8">
      <Center mb="6" h="300" w="full">
        <MapContainer tripId={tripId} />
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
