import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import {
  Text,
  Box,
  View,
  Avatar,
  VStack,
  HStack,
  Divider,
  Button,
  ScrollView,
} from "native-base";
import React, { useContext, useEffect } from "react";
import { NavigationLabelComponent } from "../../components/NavigationLabel";
import { cancelPost } from "../../services/backend/PostController";
import { DescriptionLine } from "../../components/DescriptionLine";
import {
  getPostDetail,
  applyPost,
  cancelApplyPost,
} from "../../services/backend/PostController";
import { useQuery } from "react-query";
import { PostDetail } from "../../services/backend/PostController/type";
import { AppLoading } from "../../components/AppLoading";
import useAuth from "../../hooks/useAuth";
import { User } from "../../types";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";
import moment from "moment";
import { NotificationContext } from "../../containers/NotificationProvider/NotificationProvider";

export type PostDetailScreenProps = {};

const getTripInformation = (postData: PostDetail | undefined) => {
  return [
    {
      title: "From",
      description: postData?.startStation?.name ?? "",
    },
    {
      title: "To",
      description: postData?.endStation?.name ?? "",
    },
    {
      title: "Start at",
      description: postData?.startTime
        ? moment(postData?.startTime).format("h:mm a - DD/MM/YYYY")
        : "",
    },
  ];
};

const getProfileInformation = (user: User) => {
  return [
    {
      title: "Name",
      description: user?.name ?? "",
    },
    {
      title: "Phone Number",
      description: user?.phone ?? "",
    },
    {
      title: "Average point",
      description: user?.averagePoint ?? "N/A",
    },
  ];
};

export default function PostDetailScreen() {
  const { setErrorMsg } = useContext(ErrorContext);
  const route = useRoute();
  const params = route?.params as { postId: number };
  const postId = params?.postId;
  const navigation = useNavigation();
  const { user } = useAuth();

  const {
    isLoading,
    isRefetching,
    data: res,
    refetch,
    isError,
    error,
  } = useQuery(["postDetail", params.postId], async () => {
    const result = (await getPostDetail(postId))?.data;
    if (result.code !== 0) {
      throw result;
    }

    return result;
  });

  const { notification } = useContext(NotificationContext);

  useEffect(() => {
    refetch();
  }, [notification]);

  const checkIsOwner = () => res?.data?.author?.id === user.id;

  const checkIsApply = () =>
    res?.data?.applications?.some((applier: User) => applier.id === user.id) ??
    false;

  const cancelPostHandler = async () => {
    try {
      const { data: result } = await cancelPost(postId);
      if (result.code !== 0) {
        setErrorMsg({
          code: result.code,
          message: result.message,
        });
      }
      navigation.goBack();
      return result.data;
    } catch (e) {
      console.log(e);
    }
  };

  const applyAction = async (action: string) => {
    try {
      const { data: result } =
        action === "CANCEL"
          ? await cancelApplyPost(postId)
          : await applyPost(postId);
      if (result.code) {
        setErrorMsg({
          code: result?.code,
          message: result?.message,
        });
      }
      if (result?.data?.success) {
        refetch();
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    <ScrollView>
      <Box h="full" w="full" px="3" pt="5" pb="10">
        <HStack
          backgroundColor="white"
          alignItems="center"
          rounded="lg"
          padding={3}
        >
          <Avatar bg="green.500" mr="5" size="lg" />
          <View>
            <DescriptionLine
              title="Title"
              description="Picker request post"
              fontSize="lg"
            />
            <DescriptionLine
              title="ID"
              description={res?.data?.id ? res?.data?.id.toString() : ""}
              fontSize="lg"
            />
          </View>
        </HStack>
        <View padding={3} backgroundColor="white" rounded="md" mt={4}>
          <Text fontSize="2xl" bold mb="3">
            General information
          </Text>
          <VStack space={1}>
            {getTripInformation(res?.data).map((data) => (
              <DescriptionLine
                title={data.title}
                description={data.description}
              />
            ))}
          </VStack>
          <Divider my="3" />
          <DescriptionLine
            title="Note"
            description={res?.data?.description ?? ""}
          />
        </View>
        {checkIsOwner() ? (
          <View>
            <NavigationLabelComponent
              path="MyPickerPostListScreen"
              text="Applied Request"
              optionalData={{ postId }}
            />
            <View backgroundColor="white" mt="3" p="3" rounded="lg">
              <Button
                onPress={() => cancelPostHandler()}
                rounded="full"
                backgroundColor="#059669"
              >
                <Text color="white" bold>
                  Cancel this post
                </Text>
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <View padding={3} backgroundColor="white" rounded="lg" mt={4}>
              <Text fontSize="2xl" bold mb="3">
                Partner information
              </Text>
              <VStack space={1}>
                {getProfileInformation(res?.data?.author).map((data) => (
                  <DescriptionLine
                    title={data?.title}
                    description={data?.description ?? ""}
                  />
                ))}
              </VStack>
            </View>
            {res?.data?.status !== "COMPLETED" ? (
              <View backgroundColor="white" mt="3" p="3" rounded="lg">
                <Button
                  onPress={() =>
                    applyAction(checkIsApply() ? "CANCEL" : "APPLY")
                  }
                  rounded="full"
                  backgroundColor={checkIsApply() ? "#ED4337" : "#059669"}
                >
                  <Text color="white" bold>
                    {checkIsApply() ? "Cancel apply" : "Apply this post"}
                  </Text>
                </Button>
              </View>
            ) : null}
          </View>
        )}
      </Box>
    </ScrollView>
  );
}
