import { useNavigation } from "@react-navigation/native";
import { Box, ScrollView, Text, Flex } from "native-base";
import React from "react";
import { HomeHeaderContainer } from "../../containers/HomeHeader";
import { CardActionComponent } from "../../components/CardAction";
import { TripCardComponent, TripCardSkeleton } from "../../components/TripCard";
import { useQuery } from "react-query";
import { getCurrentTripAPI } from "../../services/backend/TripsController";
import moment from "moment";
import { SimpleTrip } from "../../services/backend/TripsController/type";
import _ from "lodash";

export type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} px="3" py="10">
      <HomeHeaderContainer />
      <Box mt="5">
        <CurrentTrip />
      </Box>
      <Box mt="5">
        <Text>What do you want to do now?</Text>
        <Flex direction="row" justifyContent="space-around" mt="3">
          <CardActionComponent
            image={{
              url: "https://images.unsplash.com/photo-1554672408-730436b60dde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80",
            }}
            title="Create a Post"
            onPress={() => navigation.navigate("CreatePost" as never)}
          />
          <CardActionComponent
            image={{
              url: "https://images.unsplash.com/photo-1467008203540-c6dfa96e7bb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
            }}
            title="Pick a Request"
            onPress={() => navigation.navigate("PublicPost" as never)}
          />
        </Flex>
      </Box>
    </ScrollView>
  );
};

function CurrentTrip() {
  const {
    isLoading,
    data: res,
    error,
  } = useQuery("currentTrip", async () => {
    return (await getCurrentTripAPI()).data;
  });

  const mapperHandler = (data: SimpleTrip) => {
    console.log(data);
    return {
      toLocation: data?.startStation,
      fromLocation: data?.endStation,
      startAt: data?.startAt
        ? moment(data?.startAt).format("h:mm a - DD/MM/YYYY")
        : "",
    };
  };

  //@ts-ignore
  if (
    isLoading == false &&
    (!res?.data ||
      res.code !== 0 ||
      _.get(error, "response.status", undefined) === 404)
  )
    return null;

  return (
    <Box>
      <Text>Your current trip</Text>
      <Box mt="2">
        {isLoading ? (
          <TripCardSkeleton />
        ) : (
          <TripCardComponent
            onPress={() => {
              //TODO: navigate to trip detail screen later
            }}
            tripData={mapperHandler(res.data)}
          />
        )}
      </Box>
    </Box>
  );
}

export default HomeScreen;
