import React from "react";
import { ScrollView, Text, VStack, Pressable } from "native-base";
import { SimplePost } from "../../services/backend/PostController/type";
import HomePostCard from "../../components/HomePostCard/HomePostCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export type HomeCardContainerProps = {
  postData: SimplePost[];
};

const HomeCardContainer: React.FC<HomeCardContainerProps> = ({ postData }) => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal={true} pb="2" pl="2">
      {postData
        .filter((item, idx) => idx < 4)
        .map((post: SimplePost) => (
          <HomePostCard post={post} />
        ))}
      <VStack justifyContent="center" mr="10">
        <Pressable
          display="flex"
          alignItems="center"
          onPress={() => navigation.navigate("MyPostListScreen" as never)}
        >
          <AntDesign name="rightcircle" size={24} color="green" />
          <Text>See all</Text>
        </Pressable>
      </VStack>
    </ScrollView>
  );
};

export default HomeCardContainer;
