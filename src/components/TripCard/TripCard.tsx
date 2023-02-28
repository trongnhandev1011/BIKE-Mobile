import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleTrip } from "../../services/backend/TripsController/type";
import { DescriptionLine } from "../DescriptionLine";

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
          <Box marginLeft={4} w="full">
            <DescriptionLine
              fontWeight="semibold"
              title="From"
              description={tripData?.fromLocation}
            />
            <DescriptionLine
              fontWeight="semibold"
              title="To"
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
