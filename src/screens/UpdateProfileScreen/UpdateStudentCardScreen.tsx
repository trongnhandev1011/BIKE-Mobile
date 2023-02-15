import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

type SetFormField = (field: string, value: any) => void;

const UpdateStudentCardScreen = () => {
  const [image, setImage] = useState<string>("");

  const route = useRoute();
  const setFormField = route?.params as SetFormField;

  const navigation = useNavigation();

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
      setFormField("card", result.assets[0]);
      navigation.goBack();
    }
  };
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button title="Click to upload your student card" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 500, height: 500 }} />
        )}
      </View>
    </>
  );
};

export default UpdateStudentCardScreen;
