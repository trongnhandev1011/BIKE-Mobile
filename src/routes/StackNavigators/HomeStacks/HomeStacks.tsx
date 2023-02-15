import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../../screens/HomeScreen";
import { CreatePostScreen } from "../../../screens/CreatePostScreen";
import { PickRequestScreen } from "../../../screens/PickRequestScreen";
import PublicPostListScreen from "../../../screens/PublicPostListScreen/PublicPostListScreen";

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
        options={{ title: "Pick Request" }}
      />
    </Stack.Navigator>
  );
}