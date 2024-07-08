import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import TimeSheetForm from "../Forms/TimeSheetForm";
import Modal from "../Modal";
import Button from "../Button";
import Card from "../Common/Card";

import { initializeTimeSheets } from "../../reducers/timesheetReducer";

import "./index.scss";

const TimeSheetPage = () => {
  const dispatch = useDispatch();
  const timeSheet = useSelector((state) => state.timeSheet);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(initializeTimeSheets());
  }, []);

  const renderTimeSheet = (timeSheet) => {
    if (timeSheet) {
      const { venueName, startTime, endTime, duration, date } = timeSheet;
      return (
        <Card
          title={venueName}
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          date={date}
          key={date}
        />
      );
    }
  };

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
      {timeSheet.map((timeSheet) => renderTimeSheet(timeSheet))}
    </div>
  );
};

export default TimeSheetPage;
