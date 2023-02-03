import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useAppDispatch } from "../../redux/store";
import useAuth from "../../hooks/useAuth";
import { User } from "../../types";
import { getAuthenticatedUserAPI } from "../../services/backend/AuthController";
import { initializeAuth } from "../../redux/authentication/authentication.action";

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

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  return <>{isAuthUser ? AuthComponent(user) : UnAuthComponent(user)}</>;
}
