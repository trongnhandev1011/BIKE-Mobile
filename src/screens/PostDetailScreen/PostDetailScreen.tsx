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
import React, { useEffect } from "react";
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
      description: postData?.startTime ?? "",
    },
  ];
};

const getProfileInformation = (user: User | {}) => {
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
  } = useQuery(["postDetail", params.postId], async () => {
    const result = (await getPostDetail(postId))?.data;

    return result;
  });

  const checkIsOwner = () => res?.data?.author?.id === user.id;

  const checkIsApply = () =>
    res?.data?.applications?.some((applier: User) => applier.id === user.id) ??
    false;

  const cancelPostHandler = async () => {
    try {
      const { data: result } = await cancelPost(postId);
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
      if (result.data.success) {
        refetch();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(() => {
    refetch();
  });

  if (isLoading) return <AppLoading />;

  return (
    <ScrollView>
      <Box h="full" w="full" px="3" pt="5" pb="10">
        <HStack
          backgroundColor="white"
          alignItems="center"
          borderRadius="30"
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
        <View padding={3} backgroundColor="white" borderRadius="10" mt={4}>
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
            <View backgroundColor="white" mt="3" p="3" borderRadius={20}>
              <Button
                onPress={() => cancelPostHandler()}
                borderRadius={30}
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
            <View padding={3} backgroundColor="white" borderRadius="10" mt={4}>
              <Text fontSize="2xl" bold mb="3">
                Partner information
              </Text>
              <VStack space={1}>
                {getProfileInformation(res?.data?.author).map((data) => (
                  <DescriptionLine
                    title={data.title}
                    description={data.description}
                  />
                ))}
              </VStack>
            </View>
            <View backgroundColor="white" mt="3" p="3" borderRadius={20}>
              <Button
                onPress={() => applyAction(checkIsApply() ? "CANCEL" : "APPLY")}
                borderRadius={30}
                backgroundColor={checkIsApply() ? "#ED4337" : "#059669"}
              >
                <Text color="white" bold>
                  {checkIsApply() ? "Cancel apply" : "Apply this post"}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Box>
    </ScrollView>
  );
}
