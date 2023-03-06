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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { FormItem } from "../../containers/FormItem";
import { InfiniteList } from "../../components/InfiniteList";
import { TripStatusConstants } from "../../constants/TripStatusConstants";
import { CustomizedDateTimePicker } from "../../containers/CustomizedDateTimePicker";
import { AppLoading } from "../../components/AppLoading";

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
  const [queryKey, setQueryKey] = useState({
    status: undefined,
    startFrom: undefined,
    startTo: undefined,
    query: "",
  });
  const {
    isLoading,
    isRefetching,
    data: tripData,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey, "myTrips"],
    async ({ pageParam = 1, queryKey }) => {
      const { status, query, startFrom, startTo } = queryKey?.[0] ?? {
        status: undefined,
        startFrom: undefined,
        startTo: undefined,
        query: "",
      };

      const res = (
        await getAllTripsAPI(pageParam, 10, {
          status: status ? status : undefined,
          query,
          startFrom: startFrom ? moment(startFrom).toISOString() : undefined,
          startTo: startFrom ? moment(startTo).toISOString() : undefined,
        })
      ).data;
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
    return {
      toLocation: data.startStation,
      fromLocation: data.endStation,
      startAt: data.postedStartTime
        ? moment(data.postedStartTime).format("h:mm a - DD/MM/YYYY")
        : "",
      status: data.status,
    };
  };

  useFocusEffect(() => {
    refetch();
  });

  if (isLoading) return <AppLoading />;

  return (
    <>
      <FilterModalContext.Provider
        value={{
          isOpenModal,
          submitHandler: (data: any) => {
            console.log(data);
            setOpenModal(false);
            setQueryKey((preState) => ({
              ...preState,
              status: data?.status === "ALL" ? undefined : data?.status,
              startFrom: data?.startFrom,
              startTo: data?.startTo,
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
  const { control, handleSubmit, reset, getValues } = useForm({
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
          <FormItem
            label="Start from"
            control={control as any}
            render={({ field: { onChange, value } }) => (
              <CustomizedDateTimePicker
                value={new Date(value)}
                onChange={(_, date) => {
                  onChange(moment(date).utc());
                }}
              />
            )}
            defaultValue={moment(Date.now()).utc()}
            name="startFrom"
          />
          <FormItem
            label="Start to"
            control={control as any}
            render={({ field: { onChange, value } }) => (
              <CustomizedDateTimePicker
                value={new Date(value)}
                onChange={(_, date) => {
                  onChange(moment(date).utc());
                }}
              />
            )}
            defaultValue={moment(Date.now()).utc()}
            name="startTo"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                reset();
                onReset();
                onSubmit(getValues());
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
