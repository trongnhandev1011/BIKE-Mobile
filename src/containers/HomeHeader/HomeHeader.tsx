import { IconButton, Text, Avatar } from "native-base";
import React from "react";
import { HomeHeaderComponent } from "../../components/HomeHeader";
import useAuth from "../../hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HomeHeaderProps = {};

export default function HomeHeader() {
  const {
    user,
    action: { logout },
  } = useAuth();

  return (
    <>
      <HomeHeaderComponent
        avatar={{
          //@ts-ignore
          url: user?.imageUrl,
          //@ts-ignore
          fallback: user?.email?.[0].toUpperCase(),
        }}
        content="Welcome back!"
        button={
          <IconButton
            onPress={logout}
            icon={
              <MaterialCommunityIcons color="black" name="logout" size={28} />
            }
          />
        }
      />
    </>
  );
}
