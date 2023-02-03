import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Center, Button } from "native-base";
import * as WebBrowser from "expo-web-browser";
import useAuth from "../../hooks/useAuth";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export type LoginScreenProps = {};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {
    action: { login },
    status: { code, error },
  } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "861135800563-ift2nj7qp73g9aril8q0ra7lb320c269.apps.googleusercontent.com",
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

  console.log(error);

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      const { authentication } = response;
      //TODO: will get the auth code to send to the server later
      login({ authCode: "test" });
    }
  }, [response]);

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
