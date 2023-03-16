import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Center, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleTrip } from "../../services/backend/TripsController/type";
import { SimplePost } from "../../services/backend/PostController/type";
import { DescriptionLine } from "../DescriptionLine";
import { UserRoleConstants } from "../../constants/UserRoleConstants";

export type Props = {
  postData: {
    fromLocation: string;
    toLocation: string;
    startAt: string;
    role: string;
    status: string;
    id: number;
  };
  onPress: Function;
};

const PostCard: React.FC<Props> = ({ postData, onPress }) => {
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
                name="file-document"
                size={24}
                color="white"
              />
            </Avatar>
            <Text mt="1" color="green.800" fontWeight="semibold" fontSize="md">
              {postData.id}
            </Text>
          </Flex>
          <Box marginLeft={4} w="4/5">
            <DescriptionLine
              fontWeight="semibold"
              title="From"
              description={postData?.fromLocation}
              isTruncated={true}
            />
            <DescriptionLine
              fontWeight="semibold"
              title="To"
              description={postData?.toLocation}
              isTruncated={true}
            />
            <DescriptionLine
              fontWeight="semibold"
              title="Start at"
              description={postData?.startAt}
            />
            <DescriptionLine
              fontWeight="semibold"
              title="Finding"
              description={
                postData?.role === "GRABBER"
                  ? UserRoleConstants.PASSENGER.label
                  : UserRoleConstants.GRABBER.label
              }
            />
            {postData?.status ? (
              <DescriptionLine
                fontWeight="semibold"
                title="Status"
                description={postData?.status}
              />
            ) : null}
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default PostCard;
