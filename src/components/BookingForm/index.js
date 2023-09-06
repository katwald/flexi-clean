import React, { useState } from "react";

const BookingForm = () => {
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");

  const handleAddBooking = (e) => {
    e.preventDefault();
    console.log("venue", venue, startDate, endDate, description, cleaningDate);
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
        value={endDate}
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
