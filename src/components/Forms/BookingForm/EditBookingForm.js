import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateBooking } from "../../../reducers/bookingsReducers";
import {
  setNotification,
  setNotificationType,
} from "../../../reducers/notificationReducer";
// import { dateTimeLocalFormat } from "../../../helpers/dateTimeLocalFormatter";

import Button from "../../Button";
import Input from "../../Input";
import TextArea from "../../TextArea";

const BookingForm = ({
  _venue,
  _startDate,
  _endDate,
  _description,
  _cleaningDate,
  _booking,
  setEditBookingModalVisible,
  editBookingModalVisible,
}) => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState(_venue);
  const [startDate, setStartDate] = useState(_startDate.substring(0, 16));
  const [endDate, setEndDate] = useState(_endDate.substring(0, 16));
  const [description, setDescription] = useState(_description);
  const [cleaningDate, setCleaningDate] = useState(
    _cleaningDate.substring(0, 16)
  );
  // const [cleaningTag, setCleaningTag] = useState(_cleaningDate);

  const dispatchUpdatebooking = (e) => {
    e.preventDefault();
    const updatedBookingObj = {
      ..._booking,
      venueName: venue,
      bookingStatus: {
        ..._booking.bookingStatus,
        bookingDescription: description,
        cleaningDate: cleaningDate,
        bookingStart: startDate,
        bookingEnd: endDate,
      },
    };
    dispatch(updateBooking(_booking.id, updatedBookingObj));
    dispatch(
      setNotification(
        `${updatedBookingObj.venueName} info has been successfully updated. `
      )
    );
    dispatch(setNotificationType("success"));
    setEditBookingModalVisible(!editBookingModalVisible);
    console.log("updatedObj", updatedBookingObj);
  };

  const venues = [
    "Roba Lounge",
    "Roba Lounge II",
    "Hiisi Resort",
    "Villa Björkbacken",
  ];
  return (
    <form onSubmit={dispatchUpdatebooking}>
      <div className="booking-form edit-form">
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
            label="Start Date"
            name="start date"
            value={startDate}
            type="datetime-local"
            onChange={({ target }) => setStartDate(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            label="End Date"
            name="end date"
            value={endDate}
            type="datetime-local"
            onChange={({ target }) => setEndDate(target.value)}
          />
        </div>
        <div className="booking-form__input">
          <Input
            label="CleaningDate"
            name="cleaningDate"
            value={cleaningDate}
            type="datetime-local"
            min="4:00"
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
        {/* <TextArea
          name="cleaningTag"
          value={description}
          rows="4"
          cols="30"
          type="text"
          onChange={({ target }) => setCleaningTag(target.value)}
        /> */}
        <div className="booking-form__button">
          <Button primary type="submit">
            submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
