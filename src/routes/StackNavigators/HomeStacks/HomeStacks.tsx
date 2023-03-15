import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../../screens/HomeScreen";
import { CreatePostScreen } from "../../../screens/CreatePostScreen";
import PublicPostListScreen from "../../../screens/PublicPostListScreen/PublicPostListScreen";
import { PostDetailScreen } from "../../../screens/PostDetailScreen";
import { MyPostListScreen } from "../../../screens/MyPostListScreen";
import { MyPickerPostListScreen } from "../../../screens/MyPickerPostList";
import { PickerProfileScreen } from "../../../screens/PickerProfileScreen";

const Stack = createNativeStackNavigator();

export default function HomeStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ title: "Create Post" }}
      />
      <Stack.Screen
        name="PublicPost"
        component={PublicPostListScreen}
        options={{ title: "Public Request" }}
      />
      <Stack.Screen
        name="PublicPostDetailScreen"
        component={PostDetailScreen}
        options={{ title: "Post detail" }}
      />
      <Stack.Screen
        name="MyPostListScreen"
        component={MyPostListScreen}
        options={{ title: "My Posts" }}
      />
      <Stack.Screen
        name="MyPickerPostListScreen"
        component={MyPickerPostListScreen}
        options={{ title: "My picker post list" }}
      />
      <Stack.Screen
        name="PickerProfileScreen"
        component={PickerProfileScreen}
        options={{ title: "Picker profile" }}
      />
    </Stack.Navigator>
  );
}
