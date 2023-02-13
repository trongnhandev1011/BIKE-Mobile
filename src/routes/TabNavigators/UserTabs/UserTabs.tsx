import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MyAccountScreen } from "../../../screens/MyAccountScreen";
import { HomeStacks } from "../../StackNavigators/HomeStacks";
import MyTripListStacks from "../../StackNavigators/MyTripListStacks/MyTripListStacks";
import { ActivityStacks } from "../../StackNavigators/ActivityStacks";

const Tab = createBottomTabNavigator();

const UserTabs: React.FC<{}> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="HomeStacks"
        component={HomeStacks}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStacks}
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyTripListStacks"
        component={MyTripListStacks}
        options={{
          title: "My Trips",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="motorbike"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          title: "My Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabs;
