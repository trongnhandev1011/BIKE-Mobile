import React, { useState, useEffect, createContext } from "react";
import * as Notifications from "expo-notifications";
import registerForPushNotificationsAsync from "../../services/notificationService/registerForPushNotifcation";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

interface INotificationProviderProps {
  children: any;
}

export const NotificationContext = createContext<{
  expoPushToken: string | null;
  notification: any;
}>({
  expoPushToken: null,
  notification: null,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationProvider({
  children,
}: INotificationProviderProps) {
  const navigation = useNavigation();
  const [notification, setNotification] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) => {
      console.log(token);
      setExpoPushToken(token as string);
    });
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleGlobalNotificationResponse
    );
  }, []);

  const handleNotification = (notification: any) => {
    setNotification(notification);
  };

  const handleGlobalNotificationResponse = (response: any) => {
    console.log(response);
  };

  return (
    <>
      <NotificationContext.Provider
        value={{ expoPushToken: expoPushToken, notification }}
      >
        {children}
      </NotificationContext.Provider>
    </>
  );
}
