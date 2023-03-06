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
import { useInfiniteQuery } from "react-query";
import { PostCardComponent, PostCardSkeleton } from "../../components/PostCard";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { FormItem } from "../../containers/FormItem";
import { InfiniteList } from "../../components/InfiniteList";
import { getAllPostsAPI } from "../../services/backend/PostController";
import { SimplePost } from "../../services/backend/PostController/type";
import { UserRoleConstants } from "../../constants/UserRoleConstants";
import { getAllApplicationsAPI } from "../../services/backend/ApplicationController";
import {
  ApplicationCardComponent,
  ApplicationCardSkeleton,
} from "../../components/ApplicationCard";
import { SimpleApplication } from "../../services/backend/ApplicationController/type";

export type MyApplicationListScreenProps = {};

const defaultFilterValues = {
  role: null,
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

export default function MyApplicationListScreen() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [isOpenModal, setOpenModal] = useState(false);
  const [queryKey, setQueryKey] = useState({ role: undefined });
  const {
    isLoading,
    data: applicationData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryKey, "myApplications"],
    async ({ pageParam = 1, queryKey }) => {
      const { role } = queryKey?.[0] ?? { role: undefined };
      const res = (await getAllApplicationsAPI(pageParam, 10)).data;
      console.log(res);
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

  const mapperHandler = (data: SimpleApplication) => {
    return {
      toLocation: data.startStation,
      fromLocation: data.endStation,
      startAt: data.startTime
        ? moment(data.startTime).format("h:mm a - DD/MM/YYYY")
        : "",
      status: data.accepted ? "ACCEPTED" : "WAITING",
      role: data.role,
    };
  };

  return (
    <>
      {/* TODO: might need to filter status later */}
      {/* <FilterModalContext.Provider
        value={{
          isOpenModal,
          submitHandler: (data: any) => {
            setOpenModal(false);
            setQueryKey({
              role: data?.role === "ALL" ? undefined : data?.role,
            });
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
      </FilterModalContext.Provider> */}
      <Box h="full" w="full" px="3" py="5">
        {/* <HStack space={2} alignItems="center">
          <Input
            flex={1}
            value={searchInput}
            placeholder="Search"
            fontSize="lg"
            rounded="full"
            backgroundColor="white"
            onChangeText={(value) => setSearchInput(value)}
          />
          <IconButton
            onPress={() => setOpenModal(true)}
            size="sm"
            icon={<MaterialIcons name="filter-alt" size={32} color="black" />}
          />
        </HStack> */}
        <Box>
          <InfiniteList
            data={applicationData}
            skeleton={() => <ApplicationCardSkeleton />}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            render={(application) => (
              <ApplicationCardComponent
                key={application.id}
                applicationData={mapperHandler(application)}
                onPress={() => {
                  navigation.navigate(
                    "PostDetailScreen" as never,
                    {
                      postId: application.id,
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
            label="Role"
            control={control as any}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value}
                minWidth="200"
                defaultValue="ALL"
                mt={1}
                onValueChange={onChange}
              >
                <Select.Item label="All" value={"ALL"} />
                {Object.entries(UserRoleConstants).map(([key, item]) => (
                  <Select.Item label={item.label} value={key} />
                ))}
              </Select>
            )}
            defaultValue="ALL"
            name="role"
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
