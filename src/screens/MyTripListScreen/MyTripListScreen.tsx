import {
  Input,
  Box,
  HStack,
  IconButton,
  Modal,
  Button,
  Select,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllTripsAPI } from "../../services/backend/TripsController";
import { useInfiniteQuery } from "react-query";
import { TripCardComponent, TripCardSkeleton } from "../../components/TripCard";
import moment from "moment";
import { SimpleTrip } from "../../services/backend/TripsController/type";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { FormItem } from "../../containers/FormItem";
import { InfiniteList } from "../../components/InfiniteList";
import { TripStatusConstants } from "../../constants/TripStatusConstants";

export type MyTripListScreenProps = {};

const defaultFilterValues = {
  status: null,
};

const FilterModalContext = createContext<{
  isOpenModal: boolean;
  submitHandler: any;
  onCancel: any;
  onReset: any;
}>({
  isOpenModal: false,
  submitHandler: (data: any) => {},
  onCancel: () => {},
  onReset: () => {},
});

export default function MyTripListScreen() {
  const navigation = useNavigation();
  const [isOpenModal, setOpenModal] = useState(false);
  const [queryKey, setQueryKey] = useState({ status: undefined, query: "" });
  const {
    isLoading,
    data: tripData,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey],
    async ({ pageParam = 1, queryKey }) => {
      const { status, query } = queryKey?.[0] ?? {
        status: undefined,
        query: "",
      };
      const res = (await getAllTripsAPI(pageParam, 10, status, query)).data;
      return res.data;
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (_lastPage.page < _lastPage.totalPage) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const mapperHandler = (data: SimpleTrip) => {
    console.log(data);
    return {
      toLocation: data.startStation,
      fromLocation: data.endStation,
      startAt: data.startAt
        ? moment(data.startAt).format("h:mm a - DD/MM/YYYY")
        : "",
      status: data.status,
    };
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <FilterModalContext.Provider
        value={{
          isOpenModal,
          submitHandler: (data: any) => {
            setOpenModal(false);
            setQueryKey((preState) => ({
              ...preState,
              status: data?.status === "ALL" ? undefined : data?.status,
            }));
          },
          onCancel: () => {
            setOpenModal(false);
          },
          onReset: () => {
            setOpenModal(false);
          },
        }}
      >
        <FilterModal />
      </FilterModalContext.Provider>
      <Box h="full" w="full" px="3" py="10">
        <HStack space={2} alignItems="center">
          <Input
            flex={1}
            value={queryKey.query}
            placeholder="Search"
            fontSize="lg"
            rounded="full"
            backgroundColor="white"
            onChangeText={(value) =>
              setQueryKey((preState) => ({
                ...preState,
                query: value,
              }))
            }
          />
          <IconButton
            onPress={() => setOpenModal(true)}
            size="sm"
            icon={<MaterialIcons name="filter-alt" size={32} color="black" />}
          />
        </HStack>
        <Box my="4">
          <InfiniteList
            data={tripData}
            skeleton={() => <TripCardSkeleton />}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            render={(trip) => (
              <TripCardComponent
                key={trip.id}
                tripData={mapperHandler(trip)}
                onPress={() => {
                  navigation.navigate(
                    "TripDetail" as never,
                    {
                      tripId: trip.id,
                    } as never
                  );
                }}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
}

function FilterModal() {
  const { isOpenModal, submitHandler, onCancel, onReset } =
    useContext(FilterModalContext);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFilterValues,
  });
  const onSubmit = (data: any) => {
    submitHandler(data);
  };

  return (
    <Modal px={3} isOpen={isOpenModal} onClose={onCancel} safeAreaTop={true}>
      <Modal.Content w="full">
        <Modal.CloseButton />
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body>
          <FormItem
            label="Status"
            control={control as any}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value}
                minWidth="200"
                defaultValue="ALL"
                mt={1}
                onValueChange={onChange}
              >
                <Select.Item label="All" value={"ALL"} key="ALL" />
                {Object.entries(TripStatusConstants).map(([key, item]) => (
                  <Select.Item label={item.label} value={key} key={key} />
                ))}
              </Select>
            )}
            name="status"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                reset();
                onReset;
              }}
            >
              Reset
            </Button>
            <Button onPress={handleSubmit(onSubmit)}>Apply</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
