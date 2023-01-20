import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../../screens/HomeScreen/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MyTripListScreen } from "../../../screens/MyTripListScreen";
import { ActivityScreen } from "../../../screens/ActivityScreen";
import { MyAccountScreen } from "../../../screens/MyAccountScreen";

const Tab = createBottomTabNavigator();

const UserTabs: React.FC<{}> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
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
        name="MyTripList"
        component={MyTripListScreen}
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
