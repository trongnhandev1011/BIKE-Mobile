import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyAccountScreen } from "../../../screens/MyAccountScreen";
import {
  UpdateProfileScreen,
  UpdateAvatarScreen,
  UpdateStudentCardScreen,
} from "../../../screens/UpdateProfileScreen";
import { UpdateVehicleScreen } from "../../../screens/UpdateVehicleScreen";
const Stack = createNativeStackNavigator();

export default function MyAccountStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{ title: "Update profile" }}
      />
      <Stack.Screen
        name="UpdateVehicleScreen"
        component={UpdateVehicleScreen}
        options={{ title: "Update profile" }}
      />
      <Stack.Screen
        name="UpdateAvatarScreen"
        component={UpdateAvatarScreen}
        options={{ title: "Update avatar" }}
      />
      <Stack.Screen
        name="UpdateStudentCardScreen"
        component={UpdateStudentCardScreen}
        options={{ title: "Update student card" }}
      />
    </Stack.Navigator>
  );
}
