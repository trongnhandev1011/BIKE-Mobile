import { uploadMedia } from "../services/backend/AuthController";
import * as ImagePicker from "expo-image-picker";

export const uploadImage = async (file: ImagePicker.ImagePickerAsset) => {
  try {
    const result = await uploadMedia(file);
    return result.data.data.path;
  } catch (e) {
    console.log(e);
    return "";
  }
};
