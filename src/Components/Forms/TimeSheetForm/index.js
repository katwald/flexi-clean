import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createTimeSheet } from "../../../reducers/timesheetReducer";
import {
  setNotification,
  setNotificationType,
} from "../../../reducers/notificationReducer";
import { dateTimeLocalFormat } from "../../../helpers/dateTimeLocalFormatter";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";

// import "./index.scss";

const venues = ["Roba Lounge", "Hiisi Resort", "Villa Björkbacken"];

const TimeSheetForm = ({ setModalVisible, modalVisible }) => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState(venues[0]);
  const [startTime, setStartTime] = useState(dateTimeLocalFormat(new Date()));
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");

  const handleAddWorkHour = (e) => {
    e.preventDefault();
    // const workHourObj = {
    //   venueName: venue,
    //   cleaningDate: cleaningDate,
    //   startTime: startTime,
    //   endTime: endTime,
    //   Description: description,
    // };
    const workHourObj = {
      venueName: venue || "RobaLounge",
      startTime: startTime || "14:54",
      endTime: endTime || "15:54",
      date: cleaningDate || "2024-06-30",
      description: description || "description",
    };

    try {
      if (!workHourObj) {
        dispatch(setNotification("Fields cannot be empty !!"));
        dispatch(setNotificationType("error"));
      } else {
        console.log("work hour Obj", workHourObj);
        dispatch(createTimeSheet(workHourObj));
        dispatch(setNotification("hours has been successfully added."));
        dispatch(setNotificationType("success"));
        setVenue("");
        setStartTime("");
        setEndTime("");
        setDescription("");
        setCleaningDate("");
        setModalVisible(!modalVisible);
      }
    } catch (error) {
      setNotification("oops some thing went wrong !!");
      setNotificationType("danger");
    }
  };
  return (
    <form onSubmit={handleAddWorkHour}>
      <div className="booking-form">
        <div className="booking-form__select">
          <label className="booking-form__select--label">select Venue</label>
          <select
            className="booking-form__select--options"
            name="venue"
            value={venue}
            onChange={({ target }) => setVenue(target.value)}
          >
            {venues.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>
        </div>
        <div className="booking-form__input">
          <Input
            name="startTime"
            label="Start Time"
            value={startTime}
            type="time"
            onChange={({ target }) => setStartTime(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            name="endTime"
            value={endTime}
            label="End Time"
            type="time"
            onChange={({ target }) => setEndTime(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            name="cleaningDate"
            label="Cleaning Date"
            value={cleaningDate}
            type="date"
            onChange={({ target }) => setCleaningDate(target.value)}
          />
        </div>
        <div className="booking-form__text-area">
          <TextArea
            label="Description"
            name="description"
            value={description}
            rows="4"
            cols="30"
            type="text"
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div className="booking-form__button">
          <Button primary type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TimeSheetForm;
