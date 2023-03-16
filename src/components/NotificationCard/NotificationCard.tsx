import React, { useContext } from "react";
import { Pressable } from "react-native";
import { Avatar, Box, Flex, Text, TextArea } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleTrip } from "../../services/backend/TripsController/type";
import { Notification } from "../../services/backend/NotificationController/type";
import moment from "moment";
import { DescriptionLine } from "../DescriptionLine";

export type Props = {
  notificationData: Notification;
  onPress: Function;
};

const NotificationRequestCard: React.FC<Props> = ({
  notificationData,
  onPress,
}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Box
        px="4"
        py="3.5"
        backgroundColor="white"
        w="full"
        rounded="lg"
        borderColor={notificationData.isRead ? "white" : "#33B565"}
        borderWidth="1"
      >
        <Flex direction="row">
          <Box>
            <Avatar backgroundColor="#33B565">
              <MaterialCommunityIcons name="bell" size={24} color="white" />
            </Avatar>
          </Box>
          <Box ml="4" w="4/5">
            {notificationData?.time ? (
              <Text
                color="green.600"
                fontSize="sm"
                display="flex"
                flexWrap="wrap"
                maxW="4/5"
              >
                {moment(notificationData?.time).format("h:mm a - DD/MM/YYYY")}
              </Text>
            ) : null}
            <DescriptionLine
              fontWeight="semibold"
              title="Title"
              description={notificationData?.title}
            />

            <Text
              color="grey"
              fontSize="sm"
              display="flex"
              flexWrap="wrap"
              maxW="4/5"
            >
              {notificationData?.body}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default NotificationRequestCard;
