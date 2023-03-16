import { useNavigation } from "@react-navigation/native";
import { Box, ScrollView, Text, Flex, HStack } from "native-base";
import React, { useContext, useEffect } from "react";
import { HomeHeaderContainer } from "../../containers/HomeHeader";
import { CardActionComponent } from "../../components/CardAction";
import { TripCardComponent, TripCardSkeleton } from "../../components/TripCard";
import { useQuery } from "react-query";
import { getCurrentTripAPI } from "../../services/backend/TripsController";
import moment from "moment";
import { TripDetail } from "../../services/backend/TripsController/type";
import _ from "lodash";
import { getAllPostsAPI } from "../../services/backend/PostController";
import HomeCardContainer from "../../containers/HomeCardContainer/HomeCardContainer";
import { NotificationContext } from "../../containers/NotificationProvider/NotificationProvider";
import useAuth from "../../hooks/useAuth";
import { Rating } from "react-native-ratings";

export type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation();
  const { data: postData } = useQuery(["homeScreenPost"], async () => {
    const res = (await getAllPostsAPI()).data;
    return res.data;
  });

  const { user } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} px="3" pt="10" pb="6">
      <HomeHeaderContainer />
      <Box mt="5">
        <CurrentTrip />
      </Box>
      <Box mt="2">
        <Text mb="2" fontWeight="bold">
          What do you want to do now?
        </Text>
        <Flex px="4" direction="row" justifyContent="space-between" mt="3">
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
      <Text mt="6" fontWeight="bold">
        Your public post
      </Text>
      <Box mt="4" ml="4">
        {postData ? <HomeCardContainer postData={postData.items} /> : null}
      </Box>
      <Text mt="6" fontWeight="bold">
        Your total rating
      </Text>
      <Box
        style={{ padding: 10, borderRadius: 5 }}
        mt={2}
        mb={10}
        backgroundColor="white"
      >
        {user.averagePoint != null ? (
          <Rating startingValue={user.averagePoint} ratingCount={5} readonly />
        ) : (
          <Text>You haven't received any rating yet!</Text>
        )}
      </Box>
    </ScrollView>
  );
};

function CurrentTrip() {
  const {
    isLoading,
    data: res,
    error,
    refetch,
  } = useQuery("currentTrip", async () => {
    return (await getCurrentTripAPI()).data;
  });

  const { notification } = useContext(NotificationContext);

  useEffect(() => {
    refetch();
  }, [notification]);

  const mapperHandler = (data: TripDetail) => {
    console.log(data);
    return {
      toLocation: data?.startStation?.name,
      fromLocation: data?.endStation?.name,
      startAt: data?.startAt
        ? moment(data?.startAt).format("h:mm a - DD/MM/YYYY")
        : "",
    };
  };

  console.log(res);

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
            tripData={mapperHandler(res?.data)}
          />
        )}
      </Box>
    </Box>
  );
}

export default HomeScreen;
