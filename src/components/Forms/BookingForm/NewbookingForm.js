import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createBooking } from "../../../reducers/bookingsReducers";

const BookingForm = () => {
  const dispatch = useDispatch();
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");

  const handleAddBooking = (e) => {
    e.preventDefault();
    const bookingObject = {
      venueName: venue,
      bookingStatus: {
        bookingStart: startDate,
        bookingEnd: endDate,
        bookingDescription: description,
        cleaningDate: cleaningDate,
      },
    };

    dispatch(createBooking(bookingObject));
    setCleaningDate("");
    setVenue("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setCleaningDate("");
  };
  return (
    <form onSubmit={handleAddBooking}>
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
