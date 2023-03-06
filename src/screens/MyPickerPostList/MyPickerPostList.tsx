import { Box } from "native-base";
import React from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { PostRequestCard } from "../../components/PostRequestCard";
import { useQuery } from "react-query";
import { getAppliers } from "../../services/backend/PostController";
import { useNavigation } from "@react-navigation/native";
import { AppLoading } from "../../components/AppLoading";

const MyPickerPostList = () => {
  const route = useRoute();
  const params = route?.params as { postId: number };
  const postId = params.postId as number;

  const navigation = useNavigation();

  const {
    isLoading,
    data: res,
    refetch,
  } = useQuery(["pickerPostDetail", postId], async () => {
    return (await getAppliers(postId)).data.data.items;
  });

  useFocusEffect(() => {
    refetch();
  });

  if (isLoading) return <AppLoading />;

  return (
    <Box h="full" w="full" px="3" pt="5" pb="10">
      {res?.length
        ? res?.map((applier, idx) => (
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
