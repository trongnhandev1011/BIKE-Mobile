import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import "expo-dev-client";
import { withExpoSnack } from "nativewind";
import { NativeBaseProvider } from "native-base";
import NotificationProvider from "./containers/NotificationProvider/NotificationProvider";
import AuthProvider from "./containers/AuthProvider/AuthProvider";
import UserTabs from "./routes/TabNavigators/UserTabs/UserTabs";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

export type Props = {};

const queryClient = new QueryClient();

const App: React.FC<Props> = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <NotificationProvider>
              <NavigationContainer>
                <AuthProvider
                  unAuthComponent={(user) => <LoginScreen />}
                  authComponent={(user) => <UserTabs />}
                />
              </NavigationContainer>
            </NotificationProvider>
          </Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default withExpoSnack(App);
