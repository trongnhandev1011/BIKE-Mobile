import moment from "moment";
import { Box, Divider, Flex, Text, VStack } from "native-base";
import React from "react";
import { DescriptionLine } from "../../components/DescriptionLine";
import { TripDetail } from "../../services/backend/TripsController/type";
import { User } from "../../types";

const getProfileInformation = (user: User) => {
  return [
    {
      title: "Name",
      description: user?.name ?? "",
    },
    {
      title: "Phone Number",
      description: user?.phone ?? "",
    },
    {
      title: "Average point",
      description: user?.averagePoint ?? "N/A",
    },
  ];
};

export const TripPartnerCard = ({
  user,
  role,
}: {
  user: User | {};
  role: string;
}) => {
  return (
    <Box p="3" backgroundColor="white" w="full" rounded="lg">
      <Flex direction="row">
        <Box marginLeft={4}>
          <Text fontSize="lg" bold>
            Partner information
          </Text>
          <DescriptionLine
            fontWeight="semibold"
            title="Role"
            description={role}
          />
          <VStack space={1}>
            {getProfileInformation(user as User).map((data) => (
              <DescriptionLine
                fontWeight="semibold"
                title={data.title}
                description={data.description as string}
              />
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export const TripLocationCard = ({ tripData }: { tripData: TripDetail }) => {
  return (
    <Box p="3" backgroundColor="white" w="full" rounded="lg">
      <Flex direction="row">
        <Box marginLeft={4}>
          <DescriptionLine
            fontWeight="semibold"
            title="From"
            description={tripData?.startStation?.name}
          />
          <Text fontSize="sm" color="grey">
            {tripData?.startStation?.address}
          </Text>
          <DescriptionLine
            fontWeight="semibold"
            title="From"
            description={tripData?.endStation?.name}
          />
          <Text fontSize="sm" color="grey">
            {tripData?.endStation?.address}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export const TripSummaryCard = ({ tripData }: { tripData: TripDetail }) => {
  return (
    <Box p="3" backgroundColor="white" w="full" rounded="lg">
      <Flex direction="row">
        <Box marginLeft={4}>
          <Text fontWeight="bold" fontSize="lg">
            Summary
          </Text>
          <DescriptionLine
            fontWeight="semibold"
            title="Start at"
            description={moment(tripData.post.startTime).format(
              "h:mm a - DD/MM/YYYY"
            )}
          />
          {tripData.finishAt ? (
            <DescriptionLine
              fontWeight="semibold"
              title="Finish at"
              description={moment(tripData.finishAt).format(
                "h:mm a - DD/MM/YYYY"
              )}
            />
          ) : null}
          {tripData?.status ? (
            <DescriptionLine
              fontWeight="semibold"
              title="Status"
              description={tripData?.status}
            />
          ) : null}

          {tripData.cancelAt ? (
            <>
              <Divider my="2" />
              <Text fontWeight="bold" fontSize="lg">
                Cancel information
              </Text>
              <DescriptionLine
                fontWeight="semibold"
                title="Cancel at"
                description={moment(tripData.cancelAt).format(
                  "h:mm a - DD/MM/YYYY"
                )}
              />
            </>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export const TripFeedbackCard = ({ tripData }: { tripData: TripDetail }) => {
  return (
    <Box px="4" py="3.5" backgroundColor="white" w="full" rounded="lg">
      <Flex direction="row">
        <Box marginLeft={4}>
          <Text fontWeight="bold" fontSize="lg">
            Feedback
          </Text>
          <DescriptionLine
            fontWeight="semibold"
            title="Rating"
            description={tripData?.feedbackPoint?.toString()}
          />
          <DescriptionLine
            fontWeight="semibold"
            title="Description"
            description={tripData?.feedbackContent}
          />
        </Box>
      </Flex>
    </Box>
  );
};
