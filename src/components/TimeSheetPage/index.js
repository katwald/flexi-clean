import React, { useState } from "react";
import TimeSheetForm from "../Forms/TimeSheetForm";
import Modal from "../Modal";
import Button from "../Button";

import "./index.scss";

const TimeSheetPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="time-sheet">
      <Button onClick={() => setModalVisible(!modalVisible)}>Add Time</Button>
      {modalVisible && (
        <Modal setShowModal={setModalVisible} title={"Add NewBooking"}>
          <TimeSheetForm
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        </Modal>
      )}
    </div>
  );
};

export default TimeSheetPage;
