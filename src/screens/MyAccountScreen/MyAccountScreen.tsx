import {
  Center,
  Text,
  Box,
  HStack,
  Avatar,
  View,
  Button,
  ScrollView,
} from "native-base";
import { Image } from "react-native";
import React from "react";
import { User } from "../../types";
import { NavigationLabelComponent } from "../../components/NavigationLabel";
import useAuth from "../../hooks/useAuth";

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
      <ScrollView>
        <Box h="full" w="full" px="3" pt="10" pb="10">
          <HStack
            alignItems="center"
            mt="10"
            backgroundColor="white"
            shadow="2"
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
                <Text fontSize="md" color="green.800" fontWeight="semibold">
                  {userData.phone != null ? userData.phone : "Need update"}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Text fontSize="md" color="grey">
                  {userData?.email}
                </Text>
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
            py="3"
          >
            <Button
              backgroundColor="#059669"
              width="100%"
              rounded="full"
              onPress={logout}
            >
              <Text fontSize="xl" color="white" bold>
                LOG OUT
              </Text>
            </Button>
          </HStack>
          <HStack mt={20} mb={6} justifyContent="center">
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../../image/profile_img.png")}
            />
          </HStack>
        </Box>
      </ScrollView>
    </>
  );
}
