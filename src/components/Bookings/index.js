import React from "react";
import { useSelector } from "react-redux";

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  console.log("bookings", bookings);
  const renderBookings =
    bookings &&
    bookings.map((b) => {
      const { bookingStart, bookingEnd, bookingDescription } = b.bookingStatus;

      return (
        <div key={Number(b.id)}>
          <h4>{b.venueName}</h4>
          <p> booking start: {bookingStart}</p>
          <p>booking End: {bookingEnd}</p>
          <p>{bookingDescription}</p>
        </div>
      );
    });
  return <div>{renderBookings}</div>;
};

export default Bookings;
