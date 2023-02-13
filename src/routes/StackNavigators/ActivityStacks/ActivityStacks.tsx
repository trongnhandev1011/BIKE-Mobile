import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityScreen } from "../../../screens/ActivityScreen";
import { Text } from "native-base";
import { MyPostListScreen } from "../../../screens/MyPostListScreen";
import { MyApplicationListScreen } from "../../../screens/MyApplicationListScreen";
import { PostDetailScreen } from "../../../screens/PostDetailScreen";

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
        options={{ title: "Detail Post" }}
      />
    </Stack.Navigator>
  );
}
