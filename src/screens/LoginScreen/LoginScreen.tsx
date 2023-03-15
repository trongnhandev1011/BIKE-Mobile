import React, { useContext, useEffect } from "react";
import { Box, Heading, VStack, Center, Button } from "native-base";
import * as WebBrowser from "expo-web-browser";
import useAuth from "../../hooks/useAuth";
import * as Google from "expo-auth-session/providers/google";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";

WebBrowser.maybeCompleteAuthSession();

export type LoginScreenProps = {};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {
    action: { login },
    status: { code, error },
  } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "112402231809-sju8kah621nj78kgtjsc51aqk25ule4d.apps.googleusercontent.com",
    selectAccount: true,
    shouldAutoExchangeCode: false,
    scopes: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    responseType: "code",
    usePKCE: false,
    extraParams: {
      nonce: "test",
    },
  });

  const { setErrorMsg } = useContext(ErrorContext);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication, params } = response;
      console.log(response);
      //TODO: will get the auth code to send to the server later
      login({ authCode: params.code });
    }
  }, [response]);

  useEffect(() => {
    if (code === "ERROR") {
      setErrorMsg({
        code: -1,
        message: "Login failed",
      });
    }
  }, [code]);

  return (
    <Center w="full" h="full" backgroundColor="white">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome to BikesApp
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <Button
            isLoading={code === "FETCHING"}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            Login with Google
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
