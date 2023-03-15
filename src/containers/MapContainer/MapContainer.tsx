import { Box, Center } from "native-base";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import useAuth from "../../hooks/useAuth";
import { Entypo } from "@expo/vector-icons";

import TextEncodingPolyfill from "text-encoding";

import * as Location from "expo-location";
import { updateLocationAPI } from "../../services/backend/MapController";

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const MapContainer = ({ tripId }: { tripId: number }) => {
  const { user } = useAuth();
  const [location, setLocation] = useState<any>(null);
  const [partnerLocation, setPartnerLocation] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      console.log(location);
      updateLocationAPI(
        tripId,
        location.coords.latitude,
        location.coords.longitude
      );
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = new SockJS("http://52.74.214.224:8080/ws");
    const stompClient = Stomp.over(() => socket);
    stompClient.debug = () => {};

    if (user?.id) {
      try {
        stompClient.connect(
          {},
          () => {
            console.log("connected");
            stompClient.subscribe(`/trip/${tripId}/location`, (mess) => {
              const messBody = JSON.parse(mess.body);
              console.log(messBody);
              if (messBody?.accountId) {
                if (messBody?.accountId !== user?.id) {
                  setPartnerLocation({
                    latitude: messBody?.latitude,
                    longitude: messBody?.longitude,
                  });
                }
              }
            });
          },
          (e: any) => {
            console.log("error");
            console.log(e);
          }
        );
      } catch (e) {
        console.log(e);
      }
    }

    return () => stompClient.disconnect();
  }, [user]);

  return (
    <Box h="full" w="full">
      {location ? (
        <MapView
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          <Marker
            key={"me"}
            coordinate={{
              ...location,
            }}
            title={"me"}
          />
          {partnerLocation ? (
            <Marker
              key={"partner"}
              pinColor="green"
              coordinate={{
                ...partnerLocation,
              }}
              title={"partner"}
            />
          ) : null}
        </MapView>
      ) : (
        <Center w="full" h="full">
          <Center backgroundColor="#33B565" rounded="full" h="56" w="56">
            <Entypo name="location" size={100} color="white" />
          </Center>
        </Center>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapContainer;
