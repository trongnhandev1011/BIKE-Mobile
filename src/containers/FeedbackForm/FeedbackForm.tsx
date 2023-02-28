import { Box, Button, Input } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { createFeedbackAPI } from "../../services/backend/FeedbacksController";
import { FormItem } from "../FormItem";
import { Rating, AirbnbRating } from "react-native-ratings";

export default function FeedbackForm({
  tripId,
  handlePostSubmit,
}: {
  tripId: number;
  handlePostSubmit: any;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { point: number; content: string } | any) => {
    //TODO: call API to submit
    let result = false;
    try {
      const res = (await createFeedbackAPI(tripId, data)).data;
      if (res.code === 0) result = true;
      console.log(res.data);
    } catch (e) {
      console.log(e);
      //ignore
    }
    handlePostSubmit && handlePostSubmit(result, data);
  };

  return (
    <Box>
      <FormItem
        name="point"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Box mb="6">
            <AirbnbRating
              size={32}
              onFinishRating={(rating: number) => onChange(rating)}
            />
          </Box>
        )}
      />

      <FormItem
        name="content"
        label="Description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            placeholder="Write your description in here"
            onChangeText={(value) => onChange(value)}
            value={value}
            variant="underlined"
          />
        )}
      />
      <Button mt="8" onPress={handleSubmit(onSubmit)} rounded="full">
        Submit
      </Button>
    </Box>
  );
}
