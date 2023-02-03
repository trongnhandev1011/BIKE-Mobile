import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, HStack, Text } from "native-base";
import moment from "moment";
import { addTimetoStartDate } from "../../utils/DateTimeUtils";
import { Platform } from "react-native";

type Props = {
  value: Date;
  onChange?: (event: DateTimePickerEvent, date: Date | undefined) => void;
};

export default function CustomizedDateTimePicker({ value, onChange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(() => {
    if (Platform.OS === "ios") return true;
    else return false;
  });
  const [showTimePicker, setShowTimePicker] = useState(() => {
    if (Platform.OS === "ios") return true;
    else return false;
  });

  const handleOnChange = (
    type: "date" | "time",
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    setShowDatePicker(Platform.OS === "ios");
    setShowTimePicker(Platform.OS === "ios");
    if (!date) {
      onChange && onChange(event, date);
      return;
    }
    let currentValue = moment(value);
    if (type === "date") {
      currentValue = addTimetoStartDate(moment(date), currentValue);
    } else {
      currentValue = addTimetoStartDate(currentValue, moment(date));
    }
    onChange && onChange(event, currentValue.toDate());
  };

  return (
    <HStack space={2}>
      {Platform.OS === "android" ? (
        <>
          <HStack space={4} alignItems="center">
            <Text fontSize="md">{moment(value).format("DD/MM/YYYY")}</Text>
            <Button
              rounded="full"
              onPress={() => {
                setShowDatePicker(true);
              }}
            >
              Pick date
            </Button>
          </HStack>
          <HStack space={4} alignItems="center">
            <Text fontSize="md">{moment(value).format("hh:mm")}</Text>
            <Button
              rounded="full"
              onPress={() => {
                setShowTimePicker(true);
              }}
            >
              Pick time
            </Button>
          </HStack>
        </>
      ) : null}
      {showDatePicker ? (
        <RNDateTimePicker
          mode="date"
          value={value}
          onChange={(event, date) => handleOnChange("date", event, date)}
        />
      ) : null}
      {showTimePicker ? (
        <RNDateTimePicker
          mode="time"
          value={value}
          onChange={(event, date) => handleOnChange("time", event, date)}
        />
      ) : null}
    </HStack>
  );
}
