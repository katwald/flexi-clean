import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateBooking } from "../../../reducers/bookingsReducers";

const BookingForm = ({
  _venue,
  _startDate,
  _endDate,
  _description,
  _cleaningDate,
  _booking,
}) => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState(_venue);
  const [startDate, setStartDate] = useState(_startDate);
  const [endDate, setEndDate] = useState(_endDate);
  const [description, setDescription] = useState(_description);
  const [cleaningDate, setCleaningDate] = useState(_cleaningDate);

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
      //   cleaningStatus: {
      //     ..._booking.cleaningStatus,
      //     assignedCleaner: assignedWorker,
      //   },
    };
    dispatch(updateBooking(_booking.id, updatedBookingObj));
    // dispatch(null);
  };
  return (
    <form onSubmit={dispatchUpdatebooking}>
      <div>Venue</div>
      <input
        name="venue"
        value={venue}
        onChange={({ target }) => setVenue(target.value)}
      />
      <div>Start Date</div>
      <input
        name="start date"
        value={startDate}
        type="datetime-local"
        onChange={({ target }) => setStartDate(target.value)}
      />
      <div>End Date</div>
      <input
        name="end date"
        value={endDate}
        type="datetime-local"
        onChange={({ target }) => setEndDate(target.value)}
      />
      <div>Description</div>
      <textarea
        name="description"
        value={description}
        rows="4"
        cols="30"
        type="text"
        onChange={({ target }) => setDescription(target.value)}
      />
      <div>cleaningDate</div>

      <input
        name="cleaningDate"
        value={endDate}
        type="datetime-local"
        onChange={({ target }) => setCleaningDate(target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default BookingForm;
