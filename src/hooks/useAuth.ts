import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AuthenticationState } from "../redux/authentication/authentication.slice";
import { login, logout } from "../redux/authentication/authentication.action";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

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
    },
  };
}
