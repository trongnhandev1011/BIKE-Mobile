import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Trip } from "../../services/backend/TripsController/type";

export type Props = {
  tripData: any;
  onPress: Function;
};

const TripRequestCard: React.FC<Props> = ({ tripData, onPress }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Box px="4" py="3.5" backgroundColor="white" w="full" rounded="lg">
        <Flex direction="row">
          <Box>
            <Avatar backgroundColor={"indigo.500"}>
              <MaterialCommunityIcons
                name="motorbike"
                size={24}
                color="white"
              />
            </Avatar>
          </Box>
          <Box marginLeft={4}>
            <Text fontSize="md">
              <Text fontWeight="semibold">From:</Text> {tripData?.fromLocation}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">To:</Text> {tripData?.toLocation}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">Start at:</Text> {tripData?.startAt}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default TripRequestCard;
