import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, ScrollView } from "native-base";
import React, { useState } from "react";
import { UpdateVehicleForm } from "../../containers/UpdateVehicleForm";
import { VehicleCardContainer } from "../../containers/VehicleCard";

export default function UpdateVehicleScreen() {
  const [isEdit, setEdit] = useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} px="3" py="5">
        <Box mb="12">
          {!isEdit ? (
            <Center h="full">
              <VehicleCardContainer />
              <Box mt="5">
                <Button
                  rounded="full"
                  backgroundColor="green.700"
                  onPress={() => setEdit(true)}
                >
                  Update vehicle information
                </Button>
              </Box>
            </Center>
          ) : (
            <UpdateVehicleForm handlePostSubmit={() => setEdit(false)} />
          )}
        </Box>
      </ScrollView>
    </>
  );
}
