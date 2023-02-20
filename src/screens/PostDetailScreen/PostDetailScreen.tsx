import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  Box,
  View,
  Avatar,
  VStack,
  HStack,
  Divider,
  Button,
} from "native-base";
import React, { useEffect } from "react";
import { NavigationLabelComponent } from "../../components/NavigationLabel";
import { cancelPost } from "../../services/backend/PostController";
import { DescriptionLine } from "../../components/DescriptionLine";
import { getPostDetail } from "../../services/backend/PostController";
import { useQuery } from "react-query";
import { PostDetail } from "../../services/backend/PostController/type";
import { AppLoading } from "../../components/AppLoading";

export type PostDetailScreenProps = {};

const getProfileInformation = (postData: PostDetail | undefined) => {
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

export default function PostDetailScreen() {
  const route = useRoute();
  const params = route?.params as { postId: number };
  const postId = params?.postId;
  const navigation = useNavigation();

  const {
    isLoading,
    data: res,
    refetch,
  } = useQuery("postDetail", async () => {
    return (await getPostDetail(postId)).data;
  });

  const cancelPostHandler = async () => {
    try {
      const { data: result } = await cancelPost(postId);
      navigation.goBack();
      return result.data;
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

  if (isLoading) return <AppLoading />;

  return (
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
          {getProfileInformation(res?.data).map((data) => (
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
    </Box>
  );
}
