import { Box, Button, Input, Select, VStack } from "native-base";
import React, { useState } from "react";
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
import { CreatePost } from "../../services/backend/PostController/type";
import { createPostAPI } from "../../services/backend/PostController";

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
  const [queryKey, setQueryKey] = useState(null);
  const { isLoading, data: stationData } = useQuery("stations", async () => {
    const res = (await getAllStationsAPI()).data;
    if (res.code != 0) throw new Error("Invalid respnose");
    return res;
  });
  const { data: toStationData } = useQuery([queryKey], async ({ queryKey }) => {
    const fromStation = queryKey?.[0];
    if (fromStation == null) return { data: { items: [] } };

    const res = (await getAllStationsAPI(fromStation)).data;
    if (res.code != 0) throw new Error("Invalid respnose");
    return res;
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: CreatePost | any) => {
    //TODO: call API to submit
    let result = false;
    try {
      const res = (await createPostAPI(data)).data;
      if (res.code === 0) result = true;
      console.log(res.data);
    } catch (e) {
      console.log(e);
      //ignore
    }
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
                <Select.Item
                  label={`I'm a ${item.label}`}
                  value={key}
                  key={key}
                />
              ))}
            </Select>
          )}
          defaultValue={Object.keys(PostTypeConstant)[0]}
          name="role"
          rules={CreatePostFormRules.role}
        />
      </Box>
      <Box mt="4" backgroundColor="white" p="4" pb="8" rounded="lg">
        <VStack space={2}>
          <FormItem
            isInvalid={!!errors["fromLocation"]}
            name="startStationId"
            label="From"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={(value: string) => {
                  setQueryKey(value);
                  onChange(value);
                }}
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
            rules={CreatePostFormRules.startStationId}
          />
          <FormItem
            isInvalid={!!errors["toLocation"]}
            name="endStationId"
            label={queryKey == null ? undefined : "To"}
            control={control}
            render={({ field: { onChange, value } }) =>
              queryKey == null ? (
                <Box></Box>
              ) : (
                <Select
                  onValueChange={onChange}
                  selectedValue={value}
                  placeholder="Pick destination"
                  {...defaultFormStyle}
                >
                  {toStationData?.data?.items.map((station) => (
                    <Select.Item
                      label={station.name}
                      value={station.id.toString()}
                      key={station.id}
                    />
                  ))}
                </Select>
              )
            }
            rules={CreatePostFormRules.endStationId}
          />
          <FormItem
            name="startTime"
            label="Start at"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <CustomizedDateTimePicker
                  minimumDate={new Date(Date.now())}
                  value={new Date(value)}
                  onChange={(_, date) => {
                    onChange(moment(date).utc());
                  }}
                />
              );
            }}
            defaultValue={moment(Date.now()).utc()}
            rules={CreatePostFormRules.startTime}
          />
          <FormItem
            name="description"
            label="Description"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Write your description in here"
                onChangeText={(value) => onChange(value)}
                value={value}
                variant="underlined"
              />
            )}
            rules={CreatePostFormRules.description}
          />
          <Button mt="4" onPress={handleSubmit(onSubmit)} rounded="full">
            Submit
          </Button>
        </VStack>
      </Box>
    </>
  );
}
