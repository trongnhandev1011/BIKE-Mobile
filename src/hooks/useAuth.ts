import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  AuthenticationState,
  setUser,
} from "../redux/authentication/authentication.slice";
import { login, logout } from "../redux/authentication/authentication.action";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { getAuthenticatedUserAPI } from "../services/backend/AuthController";

export default function useAuth({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { user, isAuthUser, dataFetched, isFetching, isError, error } =
    useAppSelector<AuthenticationState>(
      (state: RootState) => state.authentication
    );
  const [code, setCode] = useState("INIT");

  const logoutHandler = () => {
    dispatch(logout());
  };

  const loginHandler = ({ authCode }: { authCode: string }) => {
    try {
      dispatch(login({ authCode }));
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserInStore = async () => {
    const { data: result } = await getAuthenticatedUserAPI();
    dispatch(setUser(result.data));
  };

  useEffect(() => {
    if (!redirectTo) return;

    if (
      (redirectTo && !redirectIfFound && !isAuthUser) ||
      (redirectIfFound && isAuthUser)
    ) {
      navigation.navigate(redirectTo as never);
    }
  }, [isAuthUser, redirectIfFound, redirectTo, user]);

  useEffect(() => {
    if (!dataFetched && !isFetching) setCode("INIT");
    if (!dataFetched && isFetching) setCode("FETCHING");
    if (dataFetched && !isFetching)
      if (isError) setCode("ERROR");
      else setCode("SUCCESS");
  }, [dataFetched, isFetching]);

  return {
    user,
    isAuthUser,
    status: {
      code: code,
      error: error,
    },
    action: {
      login: loginHandler,
      logout: logoutHandler,
      updateProfileHandler: updateUserInStore,
    },
  };
}
