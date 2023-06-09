import { useNavigation } from "@react-navigation/native";
import { Box, ScrollView, Text, Flex, HStack, VStack } from "native-base";
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
import { Image } from "react-native";

export type HomeScreenProps = {};

export const getRatingEmoji = (rating: number) => {
  if (0 < rating && rating <= 1) {
    return {
      text: "Everything will be okay!",
      imageUrl: require("../../image/cry.png"),
    };
  }
  if (1 < rating && rating <= 2) {
    return {
      text: "Try your best!",
      imageUrl: require("../../image/sad.png"),
    };
  }
  if (2 < rating && rating <= 3) {
    return {
      text: "We believe you could do better!",
      imageUrl: require("../../image/neutral.png"),
    };
  }
  if (3 < rating && rating <= 4) {
    return {
      text: "Great effort!",
      imageUrl: require("../../image/happy.png"),
    };
  }
  if (4 < rating && rating <= 5) {
    return {
      text: "Excellent! Keep going!",
      imageUrl: require("../../image/love.png"),
    };
  }
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation();
  const { data: postData, refetch } = useQuery(["homeScreenPost"], async () => {
    const res = (await getAllPostsAPI()).data;
    return res.data;
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

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
      {postData?.items?.length !== 0 ? (
        <>
          <Text mt="6" fontWeight="bold">
            Your public post
          </Text>
          <Box mt="4" ml="4" mb="24">
            <HomeCardContainer postData={postData?.items ?? []} />
          </Box>
        </>
      ) : null}
      {/* <Text mt="6" fontWeight="bold">
        Your total rating
      </Text>
      <Box
        style={{ padding: 10, borderRadius: 5, marginBottom: 40 }}
        mt={2}
        mb={10}
        backgroundColor="white"
      >
        {user.averagePoint != null ? (
          <VStack>
            <Rating startingValue={user.rating} ratingCount={5} readonly />
            <HStack mt={3} alignItems="center" justifyContent="center">
              <Text>{getRatingEmoji(user.rating)?.text}</Text>
              <Image
                style={{ marginLeft: 10, width: 30, height: 30 }}
                source={getRatingEmoji(user.rating)?.imageUrl}
              />
            </HStack>
          </VStack>
        ) : (
          <HStack alignItems="center" justifyContent="center">
            <Text>You haven't received any rating yet!</Text>
            <Image
              style={{ marginLeft: 10, width: 30, height: 30 }}
              source={require("../../image/sleep.png")}
            />
          </HStack>
        )}
      </Box> */}
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
  const navigation = useNavigation();

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
      id: data.id,
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
              navigation.navigate(
                "CurrentTripDetail" as never,
                {
                  tripId: res?.data?.id,
                } as never
              );
            }}
            tripData={mapperHandler(res?.data)}
          />
        )}
      </Box>
    </Box>
  );
}

export default HomeScreen;
