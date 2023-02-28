import { Button, Modal } from "native-base";
import { useState } from "react";
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
  console.log(tripData.status);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const updateStatus = (tripId: number, status: string) => async () => {
    try {
      const res = await updateTripStatusAPI(tripId, status);
      if (res.data.code != 0) throw res;
    } catch (e) {
      console.log(e);
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
          <Button {...props}>Give feedback</Button>
        </>
      );
      break;
    default:
      action = updateStatus(tripData.id, "CANCEL");
      Component = (props: any) => <Button {...props}>Cancel trip</Button>;
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
  const updateStatus = (tripId: number, status: string) => async () => {
    try {
      const res = await updateTripStatusAPI(tripId, status);
      if (res.data.code != 0) throw res;
    } catch (e) {
      console.log(e);
    } finally {
      refetchData();
    }
  };
  let Component: any = (props: any) => null;
  let action: any = () => {};
  switch (tripData.status) {
    case "CREATED":
      action = updateStatus(tripData.id, "START");
      Component = (props: any) => <Button {...props}>Start trip</Button>;
      break;
    case "ON_GOING":
      action = updateStatus(tripData.id, "FINISH");
      Component = (props: any) => <Button {...props}>End trip</Button>;
      break;
  }

  return <Component rounded="full" onPress={action} />;
};
