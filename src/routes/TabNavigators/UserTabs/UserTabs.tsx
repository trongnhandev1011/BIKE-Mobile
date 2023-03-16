import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeStacks } from "../../StackNavigators/HomeStacks";
import MyTripListStacks from "../../StackNavigators/MyTripListStacks/MyTripListStacks";
import MyAccountStacks from "../../StackNavigators/MyAccountStacks/MyAccountStacks";
import { ActivityStacks } from "../../StackNavigators/ActivityStacks";
import { MyNotificationListScreen } from "../../../screens/MyNotificationListScreen";
import { Text } from "react-native";

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
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={size}
              color={focused ? "#33B565" : color}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#33B565" : color, fontSize: 12 }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStacks}
        options={{
          title: "Activity",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={size}
              color={focused ? "#33B565" : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#33B565" : color, fontSize: 12 }}>
              Activity
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyTripListStacks"
        component={MyTripListStacks}
        options={{
          title: "My Trips",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="motorbike"
              size={size}
              color={focused ? "#33B565" : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#33B565" : color, fontSize: 12 }}>
              My Trips
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={MyNotificationListScreen}
        options={{
          title: "Notification",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="bell"
              size={size}
              color={focused ? "#33B565" : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#33B565" : color, fontSize: 12 }}>
              My Trips
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccountStacks}
        options={{
          title: "My Account",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={focused ? "#33B565" : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#33B565" : color, fontSize: 12 }}>
              My Account
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabs;
