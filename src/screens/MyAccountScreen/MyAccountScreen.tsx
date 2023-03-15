import {
  Center,
  Text,
  Box,
  HStack,
  Avatar,
  View,
  Button,
  Pressable,
} from "native-base";
import { Image } from "react-native";
import React from "react";
import { User } from "../../types";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationLabelComponent } from "../../components/NavigationLabel";
import useAuth from "../../hooks/useAuth";

// TODO
// import backgroundImg from "../../../assets/BikeBackgroundImg.svg";
// const convertImg = Image.resolveAssetSource(backgroundImg).uri.replace(
//   "assets/",
//   ""
// );

export type MyAccountScreenProps = {};

export default function MyAccountScreen() {
  const {
    user,
    action: { logout },
  } = useAuth();

  // to avoid typescript error
  const userData = user as User;

  return (
    <>
      <Box h="full" w="full" px="3" pt="10" pb="10">
        <HStack
          alignItems="center"
          mt="10"
          backgroundColor="white"
          p={3}
          rounded="lg"
        >
          <Avatar
            size={60}
            source={{
              uri: `https://s3-ap-southeast-1.amazonaws.com${
                (user as User)?.avatar
              }`,
            }}
          />
          <View ml="3">
            <Text fontSize="xl" bold>
              {userData?.name}
            </Text>
            <HStack alignItems="center">
              <Text bold fontSize="md">
                Phone number:{" "}
              </Text>
              <Text fontSize="md" color="red.600">
                {userData.phone != null ? userData.phone : "Need update"}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text bold fontSize="md">
                Email:{" "}
              </Text>
              <Text fontSize="md">{userData?.email}</Text>
            </HStack>
          </View>
        </HStack>
        <NavigationLabelComponent
          path="UpdateProfileScreen"
          text="Update your profile"
        />
        <NavigationLabelComponent
          path="UpdateVehicleScreen"
          text="Update vehicle information"
        />
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt="6"
          backgroundColor="white"
          p="3"
          rounded="lg"
        >
          <Button
            backgroundColor="blue.600"
            width="100%"
            rounded="full"
            onPress={logout}
          >
            <Text fontSize="xl" color="white" bold>
              LOG OUT
            </Text>
          </Button>
        </HStack>
        {
          //TODO:
          /* <Image
          source={{ uri: convertImg }}
          style={{ width: 500, height: 500 }}
        /> */
        }
      </Box>
    </>
  );
}
