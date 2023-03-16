import { HStack, Box, Pressable, Image, Text } from "native-base";
import React from "react";
import { SimplePost } from "../../services/backend/PostController/type";
import { DescriptionLine } from "../DescriptionLine";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export const getImageUrl = (id: number) => {
  switch (id) {
    case 1:
      return require("../../image/fpt.jpeg");
    case 2:
      return require("../../image/vinhome.jpeg");
    case 3:
      return require("../../image/nha_van_hoa_sv.jpeg");
    case 4:
      return require("../../image/tram_dung_lvv.jpeg");
    default:
      return "";
  }
};

export const getPostData = (post: SimplePost) => {
  return [
    {
      title: "From",
      description: post.startStation,
    },
    {
      title: "To",
      description: post.endStation,
    },
    {
      title: "Time",
      description: moment(post.startTime).format("DD/MM/YYYY HH:mm"),
    },
  ];
};

export type Props = {
  post: SimplePost;
};

const HomePostCard: React.FC<Props> = ({ post }) => {
  const navigation = useNavigation();

  const startStationImg = getImageUrl(post.startStationId);
  const endStationImg = getImageUrl(post.endStationId);

  return (
    <Pressable
      shadow="2"
      backgroundColor="white"
      rounded="lg"
      mr="6"
      width="300"
      onPress={() =>
        navigation.navigate(
          "PublicPostDetailScreen" as never,
          {
            postId: post.id,
          } as never
        )
      }
    >
      <HStack>
        <Image
          w="1/2"
          height="40"
          roundedTopLeft="2"
          source={startStationImg}
        />
        <Image w="1/2" height="40" roundedTopLeft="2" source={endStationImg} />
      </HStack>
      <Box style={{ padding: 10 }}>
        {getPostData(post).map((item) => (
          <DescriptionLine
            fontSize="sm"
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>
    </Pressable>
  );
};

export default HomePostCard;
