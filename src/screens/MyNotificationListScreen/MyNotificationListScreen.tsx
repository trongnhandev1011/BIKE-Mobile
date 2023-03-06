import {
  Input,
  Box,
  HStack,
  IconButton,
  Modal,
  Button,
  Select,
} from "native-base";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import moment from "moment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { FormItem } from "../../containers/FormItem";
import { InfiniteList } from "../../components/InfiniteList";
import { UserRoleConstants } from "../../constants/UserRoleConstants";
import { getAllApplicationsAPI } from "../../services/backend/ApplicationController";
import {
  ApplicationCardComponent,
  ApplicationCardSkeleton,
} from "../../components/ApplicationCard";
import { SimpleApplication } from "../../services/backend/ApplicationController/type";
import {
  NotificationCardComponent,
  NotificationCardSkeleton,
} from "../../components/NotificationCard";
import {
  getAllNotificationsAPI,
  readNotificationAPI,
} from "../../services/backend/NotificationController";
import axiosClient from "../../services/backend/axiosClient";
import { AppLoading } from "../../components/AppLoading";

export type MyNotificationListScreenProps = {};

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

export default function MyNotificationListScreen() {
  const [queryKey, setQueryKey] = useState({ role: undefined });
  const {
    isLoading,
    data: notificationData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [queryKey, "myNotifications"],
    async ({ pageParam = 1, queryKey }) => {
      const { role } = queryKey?.[0] ?? { role: undefined };
      const res = (await getAllNotificationsAPI(pageParam, 10)).data;
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

  useFocusEffect(() => {
    refetch();
  });

  if (isLoading) return <AppLoading />;

  return (
    <>
      <Box h="full" w="full" px="3" pt="10" pb="5">
        <Box>
          <InfiniteList
            data={notificationData}
            skeleton={() => <NotificationCardSkeleton />}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            render={(notification) => (
              <NotificationCardComponent
                key={notification.id}
                notificationData={notification}
                onPress={async () => {
                  await readNotificationAPI(notification.id);
                  refetch();
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
