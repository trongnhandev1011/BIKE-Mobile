import { Avatar, Box, Center, Flex, Text, View } from "native-base";
import React from "react";

type HomeHeaderProps = {
  avatar: {
    url?: string;
    fallback?: any;
    color?: string;
  };
  content: string;
  button: any;
};

export default function HomeHeader({
  avatar,
  content,
  button: Button,
}: HomeHeaderProps) {
  return (
    <>
      <Center
        flexDirection="row"
        backgroundColor="white"
        justifyContent="space-between"
        p="3"
        rounded="full"
      >
        <Center flexDirection="row" alignItems="center">
          <Avatar
            bg={avatar.color}
            source={{
              uri: avatar.url,
            }}
          >
            {avatar.fallback}
          </Avatar>
          <View ml="3">
            <Text fontSize="md" fontWeight="bold">
              {content}
            </Text>
          </View>
        </Center>
        <Center>{Button}</Center>
      </Center>
    </>
  );
}
