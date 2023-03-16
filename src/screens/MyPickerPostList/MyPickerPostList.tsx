import { Box, Center, Text } from "native-base";
import React, { useContext, useEffect } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { PostRequestCard } from "../../components/PostRequestCard";
import { useQuery } from "react-query";
import { getAppliers } from "../../services/backend/PostController";
import { useNavigation } from "@react-navigation/native";
import { AppLoading } from "../../components/AppLoading";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";
import { NotificationContext } from "../../containers/NotificationProvider/NotificationProvider";

const MyPickerPostList = () => {
  const route = useRoute();
  const params = route?.params as { postId: number };
  const postId = params.postId as number;

  const navigation = useNavigation();
  const { setErrorMsg } = useContext(ErrorContext);

  const {
    isLoading,
    data: res,
    refetch,
    error,
    isError,
  } = useQuery(["pickerPostDetail", postId], async () => {
    const res = (await getAppliers(postId)).data;
    if (res.code !== 0) {
      throw res;
    }
    return res.data;
  });

  const { notification } = useContext(NotificationContext);

  useEffect(() => {
    refetch();
  }, [notification]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  if (isError) {
    const e = error as any;
    setErrorMsg({
      code: e?.code ?? -1,
      message: e?.message ?? "Unexpected error. Please try again later.",
    });
    navigation.goBack();
  }

  if (isLoading) return <AppLoading />;

  return (
    <Box h="full" w="full" px="3" pt="5" pb="10">
      {res?.items.length
        ? res?.items.map((applier, idx) => (
            <PostRequestCard
              key={idx}
              user={applier}
              navigate={() =>
                navigation.navigate(
                  "PickerProfileScreen" as never,
                  { user: applier, postId } as never
                )
              }
            />
          ))
        : null}
    </Box>
  );
};

export default MyPickerPostList;
