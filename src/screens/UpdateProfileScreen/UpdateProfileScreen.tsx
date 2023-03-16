import {
  Box,
  VStack,
  HStack,
  Text,
  View,
  Button,
  ScrollView,
  Input,
  Flex,
} from "native-base";
import { Image } from "react-native";
import { useContext, useState } from "react";
import { NavigationLabelComponent } from "../../components/NavigationLabel";
import { updateProfile } from "../../services/backend/AuthController/index";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../types";
import { uploadImage } from "../../services/backend/AuthController";
import { UpdateProfileData } from "../../types";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";
import * as ImagePicker from "expo-image-picker";

export type UpdateProfileScreenProps = {};

const UpdateProfileScreen = () => {
  const { setErrorMsg } = useContext(ErrorContext);
  const {
    user,
    action: { updateProfileHandler },
  } = useAuth();
  const navigation = useNavigation();

  // to avoid typescript error
  const userData = user as User;

  console.log(userData);

  const [updateData, setUpdateData] = useState<UpdateProfileData>({
    name: userData.name,
    phone: userData.phone,
    avatar: userData?.avatar
      ? userData.avatar.includes("http")
        ? userData.avatar
        : `https://s3-ap-southeast-1.amazonaws.com${userData.avatar}`
      : undefined,
    card: userData?.card
      ? userData.card.includes("http")
        ? userData.card
        : `https://s3-ap-southeast-1.amazonaws.com${userData.card}`
      : undefined,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const setFormField = (field: string, value: any) => {
    console.log(value);
    setUpdateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateUserProfile = async () => {
    console.log("test");
    try {
      console.log(updateData?.avatar);

      setLoading(true);
      let uploadAvatarResult;
      let uploadStudentCardResult;
      if (updateData?.avatar)
        uploadAvatarResult = await uploadImage(updateData.avatar);
      if (updateData?.card)
        uploadStudentCardResult = await uploadImage(updateData.card);

      const updatedData = {
        name: updateData?.name || userData.name,
        phone: updateData?.phone || userData.phone,
        avatar:
          uploadAvatarResult?.data?.code == 0
            ? uploadAvatarResult?.data?.data?.path
            : userData.avatar,
        card:
          uploadStudentCardResult?.data?.code == 0
            ? uploadStudentCardResult?.data?.data?.path
            : userData.card,
      };

      const { data: result } = await updateProfile(updatedData);
      if (result.data.success) {
        updateProfileHandler();
        setLoading(false);
      } else {
        setErrorMsg({
          code: result?.code ?? -1,
          message:
            result?.message ?? "Unexpected error. Please try again later.",
        });
      }
    } catch (e: any) {
      console.log(e);
      setErrorMsg({
        code: -1,
        message: e?.message ?? "Unexpected error. Please try again later.",
      });
    } finally {
      navigation.goBack();
    }
  };

  return (
    <ScrollView w="full" h="full">
      <Box h="full" w="full" px="3" pb="10">
        <View
          backgroundColor="white"
          mt="6"
          px="4"
          py="5"
          rounded="lg"
          shadow="2"
        >
          <Text fontSize="xl" bold mb="3">
            Your new information:
          </Text>
          <VStack space="3">
            {[
              {
                label: "Name",
                onChangeFunction: (value: string) =>
                  setFormField("name", value),
                value: updateData.name,
              },
              {
                label: "Phone",
                onChangeFunction: (value: string) =>
                  setFormField("phone", value),
                value: updateData.phone,
              },
            ].map((item, idx) => (
              <HStack alignItems="center" key={idx}>
                <Text bold fontSize="md">
                  {item.label}
                  {": "}
                </Text>
                <Input
                  value={item.value}
                  placeholder="Enter your new name here"
                  fontSize={16}
                  w="80%"
                  onChangeText={(value) => item.onChangeFunction(value)}
                />
              </HStack>
            ))}
            <HStack>
              {[
                {
                  label: "Avatar",
                  key: "avatar",
                  uri: updateData.avatar,
                },
                {
                  label: "Student card",
                  key: "card",
                  uri: updateData.card,
                },
              ].map((item, idx) => (
                <Flex key={idx}>
                  <Text bold fontSize="md" mb="4">
                    {item.label}
                    {": "}
                  </Text>
                  <UpdateImage
                    setValue={(value) => {
                      setFormField(item.key, value);
                    }}
                    initalImage={item.uri as string}
                  />
                </Flex>
              ))}
            </HStack>
          </VStack>
        </View>
        <Button
          mt="6"
          isLoading={loading}
          onPress={() => updateUserProfile()}
          rounded="full"
          backgroundColor="green.700"
        >
          Save
        </Button>
      </Box>
    </ScrollView>
  );
};

const UpdateImage = ({
  setValue,
  initalImage,
}: {
  setValue: any;
  initalImage?: string;
}) => {
  const [image, setImage] = useState(initalImage ?? undefined);

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
      setValue(result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={{ justifyContent: "center" }}>
        <Flex alignItems={image ?? initalImage ? "center" : "flex-start"}>
          {image ?? initalImage ? (
            <Box mr="4">
              <Image
                source={{
                  uri: image ?? initalImage,
                }}
                style={{ width: 150, height: 150 }}
              />
            </Box>
          ) : null}
          <Button
            mt="4"
            mb="4"
            backgroundColor="green.700"
            h="10"
            w="32"
            rounded="full"
            onPress={pickImage}
          >
            Pick image
          </Button>
        </Flex>
      </View>
    </>
  );
};

export default UpdateProfileScreen;
