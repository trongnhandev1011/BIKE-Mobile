import React from "react";
import { Text, HStack, Pressable } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavigationLabel = ({
  path,
  text,
  optionalData,
}: {
  path: String;
  text: String;
  optionalData?: any;
}) => {
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate(path as never, optionalData as never);
        }}
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt="6"
          backgroundColor="white"
          py="3"
          px="4"
          rounded="full"
          shadow="2"
        >
          <Text fontSize="lg">{text}</Text>
          <AntDesign name="caretright" size={20} color="black" />
        </HStack>
      </Pressable>
    </>
  );
};

export default NavigationLabel;
