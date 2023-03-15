import {
  Box,
  Center,
  Text,
  Pressable,
  Flex,
  Avatar,
  VStack,
  HStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

export type ActivityScreenProps = {};

const navElements = [
  {
    link: "MyPostListScreen",
    label: "My Post List",
  },
  {
    link: "MyApplicationListScreen",
    label: "My Picked Request",
  },
];

export default function ActivityScreen() {
  const navigation = useNavigation();

  return (
    <Box h="full" w="full" px="3" py="10">
      <VStack mt="10" space="4" w="full">
        {navElements.map((item, index) => (
          <Pressable
            key={index}
            w="full"
            onPress={() => navigation.navigate(item.link as never)}
          >
            <Box
              px="4"
              py="3.5"
              backgroundColor="white"
              w="full"
              rounded="full"
            >
              <Flex direction="row">
                <Box>
                  <Avatar backgroundColor="#33B565">
                    <MaterialCommunityIcons
                      name="motorbike"
                      size={24}
                      color="white"
                    />
                  </Avatar>
                </Box>
                <Center marginLeft={4}>
                  <Text fontWeight="semibold" fontSize="md">
                    {item.label}
                  </Text>
                </Center>
              </Flex>
            </Box>
          </Pressable>
        ))}
      </VStack>
      <HStack justifyContent="center">
        <Image
          style={{ marginTop: 150 }}
          source={require("../../image/two_way.png")}
        />
      </HStack>
    </Box>
  );
}
