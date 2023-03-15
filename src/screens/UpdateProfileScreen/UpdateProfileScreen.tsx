import {
  Box,
  VStack,
  HStack,
  Text,
  View,
  Button,
  ScrollView,
  Input,
} from "native-base";
import { Image } from "react-native";
import { useContext, useState } from "react";
import { NavigationLabelComponent } from "../../components/NavigationLabel";
import { updateProfile } from "../../services/backend/AuthController/index";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../types";
import { uploadImage } from "../../utils/ImageUtils";
import { UpdateProfileData } from "../../types";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";

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

  const [updateData, setUpdateData] = useState<UpdateProfileData>({
    name: userData.name,
    phone: userData.phone,
    avatar: null,
    card: null,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const setFormField = (field: string, value: any) => {
    setUpdateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateUserProfile = async () => {
    try {
      setLoading(true);
      const uploadAvatarResult = await uploadImage(updateData.avatar);
      const uploadStudentCardResult = await uploadImage(updateData.card);

      const updatedData = {
        name: updateData?.name || userData.name,
        phone: updateData?.phone || userData.phone,
        avatar: uploadAvatarResult ? uploadAvatarResult : userData.avatar,
        card: uploadStudentCardResult ? uploadStudentCardResult : userData.card,
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
      <Box h="full" w="full" px="3" pt="5" pb="10">
        {[
          {
            path: "UpdateAvatarScreen",
            text: "Update your avatar",
            setFormField,
          },
          {
            path: "UpdateStudentCardScreen",
            text: "Update your student card",
            setFormField,
          },
        ].map((item, idx) => (
          <NavigationLabelComponent
            key={idx}
            path={item.path}
            text={item.text}
            optionalData={setFormField}
          />
        ))}
        <View backgroundColor="white" mt="6" p="3" rounded="lg">
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
            {[
              {
                label: "Avatar",
                uri: updateData.avatar?.uri,
              },
              {
                label: "Student card",
                uri: updateData.card?.uri,
              },
            ].map((item, idx) => (
              <HStack alignItems="center" key={idx}>
                <Text bold fontSize="md">
                  {item.label} {": "}
                </Text>
                <Image
                  source={{
                    uri: item.uri,
                  }}
                  style={{ width: 120, height: 120 }}
                />
              </HStack>
            ))}
          </VStack>
        </View>
        <Button
          mt="4"
          isLoading={loading}
          onPress={() => updateUserProfile()}
          rounded="lg"
          backgroundColor="#059669"
        >
          Save
        </Button>
      </Box>
    </ScrollView>
  );
};

export default UpdateProfileScreen;
