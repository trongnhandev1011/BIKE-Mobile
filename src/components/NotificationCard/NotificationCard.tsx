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
        borderColor={notificationData.isRead ? "white" : "indigo.500"}
        borderWidth="1"
      >
        <Flex direction="row">
          <Box>
            <Avatar backgroundColor={"indigo.500"}>
              <MaterialCommunityIcons name="bell" size={24} color="white" />
            </Avatar>
          </Box>
          <Box ml="4" w="full">
            <DescriptionLine
              fontWeight="semibold"
              title="Title"
              description={notificationData?.title}
            />
            {notificationData?.time ? (
              <DescriptionLine
                fontWeight="semibold"
                title="Date"
                description={moment(notificationData?.time).format(
                  "h:mm a - DD/MM/YYYY"
                )}
              />
            ) : null}
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
