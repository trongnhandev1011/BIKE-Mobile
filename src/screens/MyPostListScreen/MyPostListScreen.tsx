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

export type MyPostListScreenProps = {};

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

export default function MyPostListScreen() {
  const navigation = useNavigation();
  const [isOpenModal, setOpenModal] = useState(false);
  const [queryKey, setQueryKey] = useState({ role: undefined, query: "" });
  const {
    isLoading,
    data: postData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [queryKey],
    async ({ pageParam = 1, queryKey }) => {
      const { role, query } = queryKey?.[0] ?? { role: undefined, query: "" };
      const res = (await getAllPostsAPI(pageParam, 10, role, query)).data;
      return res.data;
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (_lastPage.page < _lastPage.totalPage - 1) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  const mapperHandler = (data: SimplePost) => {
    return {
      toLocation: data.startStation,
      fromLocation: data.endStation,
      startAt: data.startTime
        ? moment(data.startTime).format("h:mm a - DD/MM/YYYY")
        : "",
      status: data.status,
      role: data.role,
      postId: data.id,
      description: data.description,
    };
  };

  return (
    <>
      <FilterModalContext.Provider
        value={{
          isOpenModal,
          submitHandler: (data: any) => {
            setOpenModal(false);
            setQueryKey((preState) => ({
              ...preState,
              role: data?.role === "ALL" ? undefined : data?.role,
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
      <Box h="full" w="full" px="3" pt="5" pb="10">
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
            data={postData}
            skeleton={() => <PostCardSkeleton />}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            render={(post: SimplePost) => (
              <PostCardComponent
                key={post.id}
                postData={mapperHandler(post)}
                onPress={() => {
                  navigation.navigate(
                    "PostDetailScreen" as never,
                    {
                      postId: post.id,
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
                <Select.Item label="All" value={"ALL"} key="ALL" />
                {Object.entries(UserRoleConstants).map(([key, item]) => (
                  <Select.Item label={item.label} value={key} key={key} />
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
