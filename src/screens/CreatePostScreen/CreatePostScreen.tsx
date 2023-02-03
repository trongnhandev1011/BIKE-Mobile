import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, ScrollView } from "native-base";
import React, { useState } from "react";
import { ResultCardComponent } from "../../components/ResultCard";
import { CreatePostForm } from "../../containers/CreatePostForm";

export default function CreatePostScreen() {
  const [isSuccess, setSuccess] = useState<boolean | null>(null);
  const navigation = useNavigation();

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} px="3" py="5">
        {typeof isSuccess === "boolean" ? (
          <Center h="full">
            <ResultCardComponent
              type={isSuccess ? "success" : "error"}
              title={
                isSuccess ? "Create Post successfully" : "Failed to create Post"
              }
              description={
                isSuccess
                  ? "Thank You! Your post has been created successfully. You can go to post list to track the post progress!"
                  : "Failed to create post, please try again later!"
              }
              buttons={
                <>
                  <Button
                    flex={1}
                    variant="outline"
                    rounded="lg"
                    onPress={() => navigation.navigate("Home" as never)}
                  >
                    Go to Home
                  </Button>
                  {isSuccess ? (
                    <Button
                      flex={1}
                      rounded="lg"
                      onPress={() => navigation.navigate("Activity" as never)}
                    >
                      Go to Post list
                    </Button>
                  ) : (
                    <Button
                      flex={1}
                      rounded="lg"
                      onPress={() => setSuccess(null)}
                    >
                      Try again
                    </Button>
                  )}
                </>
              }
            />
          </Center>
        ) : (
          <Box mb="12">
            <CreatePostForm handlePostSubmit={(result) => setSuccess(false)} />
          </Box>
        )}
      </ScrollView>
    </>
  );
}
