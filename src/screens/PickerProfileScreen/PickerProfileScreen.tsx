import { Box, Image, Center, View, Text, VStack, Button } from "native-base";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { User } from "../../types";
import { DescriptionLine } from "../../components/DescriptionLine";
import { useNavigation } from "@react-navigation/native";
import {
  acceptAppliers,
  rejectAppliers,
} from "../../services/backend/PostController";

const getProfileData = (user: User) => {
  return [
    {
      title: "Name",
      description: user?.name,
    },
    {
      title: "Rating",
      description: user?.averagePoint ? user?.averagePoint.toString() : "",
    },
    {
      title: "Phone",
      description: user?.phone,
    },
  ];
};

const PickerProfileScreen = () => {
  const route = useRoute();
  const params = route.params as { user: User; postId: number };
  const user = params.user as User;
  const postId = params.postId as number;
  const navigation = useNavigation();

  const handleApplierActions = async (action: string) => {
    try {
      if (action === "ACCEPT") {
        const { data: result } = await acceptAppliers(postId, user.id);
        if (result.data?.success) {
          navigation.navigate(
            "MyTripListStacks" as never,
            {
              screen: "MyTripListScreen",
            } as never
          );
        }
      } else {
        const { data: result } = await rejectAppliers(postId, user.id);
        if (result.data.success) {
          navigation.goBack();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box h="full" w="full" px="3" pt="5" pb="10">
      <Center mt="5">
        <Image
          source={{
            uri: `https://s3-ap-southeast-1.amazonaws.com${user?.avatar}`,
          }}
          width={180}
          height={180}
          alt="image"
          rounded="full"
        />
      </Center>
      <View backgroundColor="white" shadow="2" p="4" rounded="lg" mt="10">
        <Text fontSize="xl" bold mb="2">
          Picker information
        </Text>
        <VStack>
          {getProfileData(user).map((data) => (
            <DescriptionLine
              title={data.title}
              description={data.description}
            />
          ))}
        </VStack>
      </View>
      <Button
        backgroundColor="green.600"
        rounded="full"
        mt="10"
        onPress={() => handleApplierActions("ACCEPT")}
      >
        <Text bold color="white">
          Accept
        </Text>
      </Button>
      <Button
        backgroundColor="red.600"
        rounded="full"
        mt="5"
        onPress={() => handleApplierActions("REJECT")}
      >
        <Text bold color="white">
          Reject
        </Text>
      </Button>
    </Box>
  );
};

export default PickerProfileScreen;
