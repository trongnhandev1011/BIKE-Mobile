import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useAppDispatch } from "../../redux/store";
import { initializeAuth } from "../../redux/authentication/authentication.slice";
import useAuth from "../../hooks/useAuth";
import { User } from "../../types";

type AuthProviderProps = {
  authComponent: (user: User) => JSX.Element;
  unAuthComponent: (user: User) => JSX.Element;
};

export default function AuthProvider({
  authComponent: AuthComponent,
  unAuthComponent: UnAuthComponent,
}: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const { isAuthUser, user } = useAuth();

  const initAuth = async () => {
    dispatch(
      initializeAuth({
        isAuthUser: !!(await SecureStore.getItemAsync(
          Constants!.expoConfig!.extra!.USER_STORAGE as string
        )),
        user:
          JSON.parse(
            (await SecureStore.getItemAsync(
              Constants!.expoConfig!.extra!.USER_STORAGE as string
            )) as string
          ) || {},
        dataFetched: false,
        isFetching: false,
        error: false,
      })
    );
  };

  useEffect(() => {
    initAuth();
  }, []);

  return <>{isAuthUser ? AuthComponent(user) : UnAuthComponent(user)}</>;
}
