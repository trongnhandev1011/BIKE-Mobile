import { ScrollView, VStack, Text, Center, Pressable } from "native-base";
import { InfiniteData, useInfiniteQuery } from "react-query";

type InfiniteListProps = {
  data:
    | InfiniteData<{
        page: number;
        pageSize: number;
        totalSize: number;
        totalPage: number;
        items: any[];
      }>
    | undefined;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  skeleton: any;
  render: (item: any, index: number) => JSX.Element;
};

export default function InfiniteList({
  data,
  isLoading,
  hasNextPage,
  fetchNextPage,
  skeleton: Skeleton,
  render,
}: InfiniteListProps) {
  return (
    <ScrollView px="0.5">
      <VStack space={5}>
        {isLoading
          ? [1, 2, 3, 4].map((value) => <Skeleton key={value} />)
          : data?.pages
              ?.reduce<any[]>((curValue, data) => {
                return [...curValue, ...data.items];
              }, [])
              ?.map(render)}
        <Center pt="1" pb="4">
          {hasNextPage ? (
            <Pressable
              onPress={() => {
                fetchNextPage();
              }}
            >
              <Text fontSize="md" color="blue.500">
                Load more...
              </Text>
            </Pressable>
          ) : (
            <Text fontSize="md">No more</Text>
          )}
        </Center>
      </VStack>
    </ScrollView>
  );
}
