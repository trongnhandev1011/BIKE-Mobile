import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserRoleConstants } from "../../constants/UserRoleConstants";

export type Props = {
  applicationData: {
    fromLocation: string;
    toLocation: string;
    startAt: string;
    role: string;
    status: string;
    id: number;
  };
  onPress: Function;
};

const ApplicationCard: React.FC<Props> = ({ applicationData, onPress }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Box
        px="4"
        py="3.5"
        backgroundColor="white"
        w="full"
        rounded="lg"
        shadow="2"
      >
        <Flex direction="row">
          <Flex alignItems="center">
            <Avatar backgroundColor="#33B565">
              <MaterialCommunityIcons
                name="application"
                size={24}
                color="white"
              />
            </Avatar>
            <Text mt="1" color="green.800" fontWeight="semibold" fontSize="md">
              {applicationData.id}
            </Text>
          </Flex>
          <Box marginLeft={4}>
            <Text fontSize="md">
              <Text fontWeight="semibold">From:</Text>{" "}
              {applicationData?.fromLocation}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">To:</Text>{" "}
              {applicationData?.toLocation}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">Start at:</Text>{" "}
              {applicationData?.startAt}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">Apply as:</Text>{" "}
              {UserRoleConstants[applicationData?.role].label}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">Status:</Text>{" "}
              {applicationData?.status}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default ApplicationCard;
