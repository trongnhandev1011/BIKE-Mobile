import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleTrip } from "../../services/backend/TripsController/type";
import { SimplePost } from "../../services/backend/PostController/type";

export type Props = {
  postData: {
    fromLocation: string;
    toLocation: string;
    startAt: string;
    role: string;
    status: string;
  };
  onPress: Function;
};

const PostCard: React.FC<Props> = ({ postData, onPress }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Box px="4" py="3.5" backgroundColor="white" w="full" rounded="lg">
        <Flex direction="row">
          <Box>
            <Avatar backgroundColor="#33B565">
              <MaterialCommunityIcons
                name="file-document"
                size={24}
                color="white"
              />
            </Avatar>
          </Box>
          <Box marginLeft={4}>
            <Text fontSize="md">
              <Text fontWeight="semibold">From:</Text> {postData?.fromLocation}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">To:</Text> {postData?.toLocation}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">Start at:</Text> {postData?.startAt}
            </Text>
            <Text fontSize="md">
              <Text fontWeight="semibold">Role:</Text> {postData?.role}
            </Text>
            {postData?.status ? (
              <Text fontSize="md">
                <Text fontWeight="semibold">Status:</Text> {postData?.status}
              </Text>
            ) : null}
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default PostCard;
