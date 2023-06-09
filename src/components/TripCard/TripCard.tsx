import React from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Flex, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DescriptionLine } from "../DescriptionLine";

export type Props = {
  tripData: any;
  onPress: Function;
};

const TripRequestCard: React.FC<Props> = ({ tripData, onPress }) => {
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
                name={
                  tripData?.role === "PASSENGER"
                    ? "seat-passenger"
                    : "motorbike"
                }
                size={24}
                color="white"
              />
            </Avatar>
            <Text mt="1" color="green.800" fontWeight="semibold" fontSize="md">
              {tripData.id}
            </Text>
          </Flex>
          <Box marginLeft={4} w="4/5">
            <DescriptionLine
              fontWeight="semibold"
              title="From"
              isTruncated={true}
              description={tripData?.fromLocation}
            />
            <DescriptionLine
              fontWeight="semibold"
              title="To"
              isTruncated={true}
              description={tripData?.toLocation}
            />

            <DescriptionLine
              fontWeight="semibold"
              title="Start at"
              description={tripData?.startAt}
            />
            {tripData?.status ? (
              <DescriptionLine
                fontWeight="semibold"
                title="Status"
                description={tripData?.status}
              />
            ) : null}
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default TripRequestCard;
