import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Image,
  Button,
  ScrollView,
} from "native-base";
import React, { useState } from "react";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";

export type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {
    action: { logout },
  } = useAuth();
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ paddingHorizontal: 20 }}
    >
      <Flex
        direction="row"
        justifyContent={"space-between"}
        style={{
          backgroundColor: "white",
          marginTop: 14,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 50,
        }}
      >
        <Flex direction="row">
          <Avatar
            size={50}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          ></Avatar>
          <Flex justifyContent={"center"} style={{ marginLeft: 14 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Welcome back!
            </Text>
            <Text style={{ fontSize: 12 }}>Hope you have a great day!</Text>
          </Flex>
        </Flex>
        <Center w="44">
          <Pressable onPress={() => logout()}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </Pressable>
        </Center>
      </Flex>
      <Center marginTop={3}>
        <Flex direction="row">
          <Button
            w={"100%"}
            colorScheme="indigo"
            borderRadius={50}
            onPress={() =>
              navigation.navigate("UserRequestListScreen" as never)
            }
          >
            My requested trip
          </Button>
        </Flex>
      </Center>
      <Flex
        marginTop={3}
        borderRadius="10"
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <Flex justifyContent={"center"} alignItems="center">
          <Text style={{ fontSize: 18, textAlign: "center", lineHeight: 26 }}>
            Need to go somewhere from
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              lineHeight: 26,
            }}
          >
            FPT University?
          </Text>
        </Flex>
        <Center h="58%" my={3}>
          <Image
            size={200}
            borderRadius={100}
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Alternate Text"
          />
        </Center>
        <Button
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => navigation.navigate("BikerRequestListScreen" as never)}
        >
          Check trip list
        </Button>
      </Flex>
    </ScrollView>
  );
};

export default HomeScreen;
