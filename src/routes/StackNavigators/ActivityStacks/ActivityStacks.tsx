import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityScreen } from "../../../screens/ActivityScreen";
import { MyPostListScreen } from "../../../screens/MyPostListScreen";
import { MyApplicationListScreen } from "../../../screens/MyApplicationListScreen";
import { PostDetailScreen } from "../../../screens/PostDetailScreen";
import { MyPickerPostListScreen } from "../../../screens/MyPickerPostList";
import { PickerProfileScreen } from "../../../screens/PickerProfileScreen";

const Stack = createNativeStackNavigator();

export default function ActivityStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPostListScreen"
        component={MyPostListScreen}
        options={{ title: "My Posts" }}
      />
      <Stack.Screen
        name="MyApplicationListScreen"
        component={MyApplicationListScreen}
        options={{ title: "My Picked Requests" }}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{ title: "Post Detail" }}
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
