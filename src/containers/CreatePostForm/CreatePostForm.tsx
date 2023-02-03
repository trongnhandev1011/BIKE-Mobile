import { Box, Button, Input, Select, VStack } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { CustomizedDateTimePicker } from "../CustomizedDateTimePicker";
import { useQuery } from "react-query";
import { getAllStationsAPI } from "../../services/backend/StationsController";
import { MaterialIcons } from "@expo/vector-icons";
import { PostTypeConstant } from "../../constants/PostTypeConstants";
import { AppLoading } from "../../components/AppLoading";
import CreatePostFormRules from "./CreatePostForm.rules";
import { FormItem } from "../FormItem";

const defaultFormStyle: {
  fontSize: string;
  variant:
    | "underlined"
    | "outline"
    | "rounded"
    | "filled"
    | "unstyled"
    | undefined;
} = {
  variant: "underlined",
  fontSize: "sm",
};

export default function CreatePostForm({
  handlePostSubmit,
}: {
  handlePostSubmit?: (result: boolean, data: any) => void;
}) {
  //TODO: might need to call 2 api for from and to location
  const { isLoading, data: stationData } = useQuery("stations", async () => {
    const res = (await getAllStationsAPI()).data;
    if (res.code != 0) throw new Error("Invalid respnose");
    return res;
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log("submiting with ", data);
    //TODO: call API to submit
    const result = true;
    handlePostSubmit && handlePostSubmit(result, data);
  };

  if (isLoading) return <AppLoading />;

  return (
    <>
      <Box backgroundColor="white" p="2" rounded="lg">
        <FormItem
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              selectedValue={value}
              onValueChange={(value) => onChange(value)}
              variant="unstyled"
              fontSize="md"
              fontWeight="bold"
              defaultValue={Object.keys(PostTypeConstant)[0]}
              dropdownIcon={
                <Box mr="3">
                  <MaterialIcons name="edit" size={24} color="black" />
                </Box>
              }
            >
              {Object.entries(PostTypeConstant).map(([key, item]) => (
                <Select.Item label={item.label} value={key} key={key} />
              ))}
            </Select>
          )}
          defaultValue={Object.keys(PostTypeConstant)[0]}
          name="type"
          rules={CreatePostFormRules.type}
        />
      </Box>
      <Box mt="4" backgroundColor="white" p="4" pb="8" rounded="lg">
        <VStack space={2}>
          <FormItem
            isInvalid={!!errors["fromLocation"]}
            name="fromLocation"
            label="From"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                selectedValue={value}
                placeholder="Pick start location"
                {...defaultFormStyle}
              >
                {stationData?.data?.items.map((station) => (
                  <Select.Item
                    label={station.name}
                    value={station.id.toString()}
                    key={station.id}
                  />
                ))}
              </Select>
            )}
            rules={CreatePostFormRules.fromLocation}
          />
          <FormItem
            isInvalid={!!errors["toLocation"]}
            name="toLocation"
            label="To"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                selectedValue={value}
                placeholder="Pick destination"
                {...defaultFormStyle}
              >
                {stationData?.data?.items.map((station) => (
                  <Select.Item
                    label={station.name}
                    value={station.id.toString()}
                    key={station.id}
                  />
                ))}
              </Select>
            )}
            rules={CreatePostFormRules.toLocation}
          />
          <FormItem
            name="startAt"
            label="Start at"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <CustomizedDateTimePicker
                  value={new Date(value)}
                  onChange={(_, date) => {
                    onChange(moment(date).utc());
                  }}
                />
              );
            }}
            defaultValue={moment(Date.now()).utc()}
            rules={CreatePostFormRules.startAt}
          />
          <FormItem
            name="note"
            label="Note"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Write your note in here"
                onChangeText={(value) => onChange(value)}
                value={value}
                variant="underlined"
              />
            )}
            rules={CreatePostFormRules.note}
          />
          <Button mt="4" onPress={handleSubmit(onSubmit)} rounded="full">
            Submit
          </Button>
        </VStack>
      </Box>
    </>
  );
}
