import { HStack, View, Image } from "native-base";
import React from "react";
import { User } from "../../types";
import { DescriptionLine } from "../DescriptionLine";
import { Pressable } from "react-native";

type PostRequestCardProps = {
  user: User;
  navigate: any;
};

const getPostRequestCardData = (user: User) => {
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

const PostRequestCard = ({ user, navigate }: PostRequestCardProps) => {
  return (
    <Pressable onPress={() => navigate()}>
      <HStack
        backgroundColor="white"
        p="4"
        mt="3"
        borderRadius={30}
        alignItems="center"
      >
        <Image
          source={{
            uri: `https://s3-ap-southeast-1.amazonaws.com${user?.avatar}`,
          }}
          width={75}
          height={75}
          alt="image"
          ml="4"
          mr="4"
        />
        <View>
          {getPostRequestCardData(user).map((data) => (
            <DescriptionLine
              title={data.title}
              description={data.description}
            />
          ))}
        </View>
      </HStack>
    </Pressable>
  );
};

export default PostRequestCard;
