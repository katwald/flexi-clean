import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createBooking } from "../../../reducers/bookingsReducers";
import {
  setNotification,
  setNotificationType,
} from "../../../reducers/notificationReducer";

import Button from "../../Button";
import Input from "../../Input";
import TextArea from "../../TextArea";

import "./index.scss";

const BookingForm = () => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");
  const [cleaningTag, setCleaningTag] = useState("");

  const handleAddBooking = (e) => {
    e.preventDefault();
    const bookingObject = {
      venueName: venue,
      bookingStatus: {
        bookingStart: startDate,
        bookingEnd: endDate,
        bookingDescription: description,
        cleaningDate: cleaningDate,
        cleaningTag: cleaningTag,
      },
    };

    dispatch(createBooking(bookingObject));
    dispatch(
      setNotification(
        `${bookingObject.venueName} info has been successfully added. `
      )
    );
    dispatch(setNotificationType("success"));
    setCleaningDate("");
    setVenue("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setCleaningDate("");
    setCleaningTag("");
  };
  return (
    <form onSubmit={handleAddBooking}>
      <div className="booking-form">
        <div className="booking-form__input">
          <Input
            name="venue"
            label="Venue"
            value={venue}
            onChange={({ target }) => setVenue(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            name="start date"
            label="Start Date"
            value={startDate}
            type="datetime-local"
            onChange={({ target }) => setStartDate(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            name="end date"
            value={endDate}
            label="End Date"
            type="datetime-local"
            onChange={({ target }) => setEndDate(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            name="cleaningDate"
            label="Cleaning Date"
            value={endDate}
            type="datetime-local"
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
        {/* <div>
          <TextArea
            name="cleaning-tag"
            label="Description"
            value={cleaningTag}
            rows="4"
            cols="30"
            type="text"
            onChange={({ target }) => setCleaningTag(target.value)}
          />
        </div> */}
        <div className="booking-form__button">
          <Button primary type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
