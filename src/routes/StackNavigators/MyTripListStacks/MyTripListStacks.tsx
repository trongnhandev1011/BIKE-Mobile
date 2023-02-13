import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTripListScreen } from "../../../screens/MyTripListScreen";
import { TripDetailScreen } from "../../../screens/TripDetailScreen";

const Stack = createNativeStackNavigator();

export default function MyTripListStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTripList"
        component={MyTripListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TripDetail"
        component={TripDetailScreen}
        options={{ title: "Trip Detail" }}
      />
    </Stack.Navigator>
  );
}
