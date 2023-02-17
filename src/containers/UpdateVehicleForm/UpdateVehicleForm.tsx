import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Select,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { AppLoading } from "../../components/AppLoading";
import UpdateVehicleFormRules from "./UpdateVehicleForm.rules";
import { FormItem } from "../FormItem";
import { VehicleTypeConstants } from "../../constants/VehicleTypeConstants";
import {
  createMyVehicleAPI,
  getMyVehicleAPI,
  updateMyVehicleAPI,
} from "../../services/backend/UserController";
import { Vehicle } from "../../services/backend/UserController/type";
import { uploadImage } from "../../services/backend/AuthController";
import { Image } from "react-native";

export default function UpdateVehicleForm({
  handlePostSubmit,
  isCreateNew,
}: {
  handlePostSubmit?: (result: boolean, data: any) => void;
  isCreateNew?: boolean;
}) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isLoading, data: vehicleData } = useQuery("myVehicle", async () => {
    const res = (await getMyVehicleAPI()).data;
    if (res.code != 0) throw new Error("Invalid respnose");
    Object.keys(res.data).forEach((key) => {
      setValue(key, `${res?.data?.[key]}`);
    });
    return res.data;
  });

  const onSubmit = async (data: Omit<Vehicle, "id" | "status"> | any) => {
    let result = false;
    console.log(data);
    try {
      //TODO:update image first
      const resImage = (await uploadImage(data.image)).data;
      console.log(resImage);
      if (resImage.code !== 0) throw new Error("Failed to upload file");
      let res = undefined;
      if (vehicleData === null) {
        res = (await createMyVehicleAPI({ ...data, image: resImage.data.path }))
          .data;
      } else {
        res = (await updateMyVehicleAPI({ ...data, image: resImage.data.path }))
          .data;
      }
      if (res.code === 0) result = true;
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
              defaultValue={Object.keys(VehicleTypeConstants)[0]}
              dropdownIcon={
                <Box mr="3">
                  <MaterialIcons name="edit" size={24} color="black" />
                </Box>
              }
            >
              {Object.entries(VehicleTypeConstants).map(([key, item]) => (
                <Select.Item label={`${item.label}`} value={key} key={key} />
              ))}
            </Select>
          )}
          defaultValue={Object.keys(VehicleTypeConstants)[0]}
          name="type"
          rules={UpdateVehicleFormRules.type}
        />
      </Box>
      <Box mt="4" backgroundColor="white" p="4" pb="8" rounded="lg">
        <VStack space={2}>
          <FormItem
            isInvalid={!!errors["licencePlate"]}
            name="licencePlate"
            label="License plate"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Write your licence plate"
                onChangeText={(value) => onChange(value)}
                value={value}
                variant="underlined"
              />
            )}
            rules={UpdateVehicleFormRules.licencePlate}
          />
          <FormItem
            isInvalid={!!errors["brand"]}
            name="brand"
            label="Brand"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Write your brand"
                onChangeText={(value) => onChange(value)}
                value={value}
                variant="underlined"
              />
            )}
            rules={UpdateVehicleFormRules.brand}
          />
          <FormItem
            isInvalid={!!errors["color"]}
            name="color"
            label="color"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Write your vehicle color"
                onChangeText={(value) => onChange(value)}
                value={value}
                variant="underlined"
              />
            )}
            rules={UpdateVehicleFormRules.color}
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
            rules={UpdateVehicleFormRules.description}
          />
          <UpdateVehicleImage
            setValue={setValue}
            initalImage={vehicleData?.image as string}
          />
          <Button mt="4" onPress={handleSubmit(onSubmit)} rounded="full">
            Submit
          </Button>
        </VStack>
      </Box>
    </>
  );
}

const UpdateVehicleImage = ({
  setValue,
  initalImage,
}: {
  setValue: any;
  initalImage?: string;
}) => {
  const [image, setImage] = useState(
    initalImage
      ? `https://s3-ap-southeast-1.amazonaws.com${initalImage}`
      : undefined
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue("image", result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Flex direction="row" alignItems="center">
          {image && (
            <Box mr="4">
              <Image
                source={{
                  uri: image ?? initalImage,
                }}
                style={{ width: 150, height: 150 }}
              />
            </Box>
          )}
          <Button h="10" onPress={pickImage}>
            Pick image
          </Button>
        </Flex>
      </View>
    </>
  );
};
