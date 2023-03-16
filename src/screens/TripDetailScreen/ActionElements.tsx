import { Button, Modal, VStack } from "native-base";
import { useContext, useState } from "react";
import { ErrorContext } from "../../containers/ErrorProvider/ErrorProvider";
import { FeedbackFormContainer } from "../../containers/FeedbackForm";
import { updateTripStatusAPI } from "../../services/backend/TripsController";
import { TripDetail } from "../../services/backend/TripsController/type";

const FeedbackModal = ({
  tripId,
  isOpen,
  setShowModal,
  handlePostSubmit,
}: {
  tripId: number;
  isOpen: boolean;
  setShowModal: any;
  handlePostSubmit: any;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Feedback form</Modal.Header>
        <Modal.Body>
          <FeedbackFormContainer
            handlePostSubmit={handlePostSubmit}
            tripId={tripId}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export const TripActionForPassenger = ({
  tripData,
  refetchData,
}: {
  tripData: TripDetail;
  refetchData: any;
}) => {
  const { setErrorMsg } = useContext(ErrorContext);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const updateStatus = (tripId: number, status: string) => async () => {
    try {
      const res = await updateTripStatusAPI(tripId, status);
      if (res.data.code != 0) {
        setErrorMsg({
          code: res.data.code,
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log(e);
      setErrorMsg({
        code: -1,
        message: e?.message ?? "Unexpected error. Please try again later.",
      });
    } finally {
      refetchData();
    }
  };

  let Component: any = (props: any) => null;
  let action: any = () => {};
  switch (tripData.status) {
    case "FINISHED":
      if (typeof tripData.feedbackPoint == "number") break;
      action = () => {
        setShowFeedbackModal(true);
      };
      Component = (props: any) => (
        <>
          <FeedbackModal
            tripId={tripData?.id as number}
            isOpen={showFeedbackModal}
            setShowModal={setShowFeedbackModal}
            handlePostSubmit={() => {
              setShowFeedbackModal(false);
              refetchData();
            }}
          />
          <Button {...props} backgroundColor="green.700">
            Give feedback
          </Button>
        </>
      );
      break;
    case "CREATED":
      action = updateStatus(tripData.id, "START");
      Component = (props: any) => (
        <VStack space={4}>
          <Button
            backgroundColor="green.700"
            rounded="full"
            onPress={updateStatus(tripData.id, "START")}
          >
            Start trip
          </Button>
          <Button
            rounded="full"
            variant="outline"
            borderColor="green.700"
            onPress={updateStatus(tripData.id, "CANCEL")}
          >
            Cancel trip
          </Button>
        </VStack>
      );
      break;
    case "ON_GOING":
      action = updateStatus(tripData.id, "FINISH");
      Component = (props: any) => (
        <Button {...props} backgroundColor="green.700">
          End trip
        </Button>
      );
      break;
  }

  return <Component rounded="full" onPress={action} />;
};

export const TripActionForBiker = ({
  tripData,
  refetchData,
}: {
  tripData: TripDetail;
  refetchData: any;
}) => {
  const { setErrorMsg } = useContext(ErrorContext);
  const updateStatus = (tripId: number, status: string) => async () => {
    console.log("test");
    try {
      const res = await updateTripStatusAPI(tripId, status);
      if (res.data.code != 0) {
        setErrorMsg({
          code: res.data.code,
          message: res.data.message,
        });
      }
      console.log(res);
    } catch (e) {
      console.log(e);
      setErrorMsg({
        code: -1,
        message: "Unexpected error. Please try again later.",
      });
    } finally {
      refetchData();
    }
  };
  let Component: any = (props: any) => null;
  let action: any = () => {};
  switch (tripData.status) {
    case "CREATED":
      action = updateStatus(tripData.id, "START");
      Component = (props: any) => (
        <VStack space={4}>
          <Button
            backgroundColor="green.700"
            rounded="full"
            onPress={updateStatus(tripData.id, "START")}
          >
            Start trip
          </Button>
          <Button
            rounded="full"
            variant="outline"
            borderColor="green.700"
            onPress={updateStatus(tripData.id, "CANCEL")}
          >
            Cancel trip
          </Button>
        </VStack>
      );
      break;
    case "ON_GOING":
      action = updateStatus(tripData.id, "FINISH");
      Component = (props: any) => (
        <Button {...props} backgroundColor="green.700">
          End trip
        </Button>
      );
      break;
  }

  return <Component rounded="full" onPress={action} />;
};
