import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createBooking } from "../../../reducers/bookingsReducers";
import "./index.scss";

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
    <div className="booking-form">
      <form onSubmit={handleAddBooking}>
        <div>
          <label>Venue</label>
        </div>
        <input
          name="venue"
          value={venue}
          onChange={({ target }) => setVenue(target.value)}
        />
        <div>
          <label>Start Date</label>
        </div>
        <input
          name="start date"
          value={startDate}
          type="datetime-local"
          onChange={({ target }) => setStartDate(target.value)}
        />
        <div>
          <label>End Date</label>
        </div>
        <input
          name="end date"
          value={endDate}
          type="datetime-local"
          onChange={({ target }) => setEndDate(target.value)}
        />
        <div>
          <label>Description</label>
        </div>
        <textarea
          name="description"
          value={description}
          rows="4"
          cols="30"
          type="text"
          onChange={({ target }) => setDescription(target.value)}
        />
        <div>
          <label>cleaningDate</label>
        </div>

        <input
          name="cleaningDate"
          value={endDate}
          type="datetime-local"
          onChange={({ target }) => setCleaningDate(target.value)}
        />
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
