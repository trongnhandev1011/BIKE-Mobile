import React, { useContext } from "react";
import { View, Button, Text, Pressable } from "react-native";
import { FSTripRequest } from "../../types/trip";
import { styled } from "nativewind";
import { Avatar, Box, Flex } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Props = {
  tripData: FSTripRequest;
  onPress: Function;
};

const TextStyled = styled(Text);
const ViewStyled = styled(View);

const TripRequestCard: React.FC<Props> = ({ tripData, onPress }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Box padding={3} backgroundColor="white" w="100%" borderRadius={10}>
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
            <TextStyled className="mb-1.5" style={{ fontSize: 15 }}>
              <TextStyled className="font-bold">From:</TextStyled>{" "}
              {tripData?.fromLocation}
            </TextStyled>
            <TextStyled className="mb-1.5" style={{ fontSize: 15 }}>
              <TextStyled className="font-bold">To:</TextStyled>{" "}
              {tripData?.toLocation}
            </TextStyled>
            <TextStyled className="mb-1">
              <TextStyled className="font-bold">Picking time:</TextStyled>
            </TextStyled>
            <TextStyled>{tripData?.bookingTime}</TextStyled>
            <TextStyled className="mb-1">
              <TextStyled className="font-bold">
                Status: {tripData?.status}
              </TextStyled>
            </TextStyled>
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default TripRequestCard;
