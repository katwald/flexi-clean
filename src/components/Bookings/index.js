import React from "react";
import { useSelector } from "react-redux";

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  console.log("bookings", bookings);
  const renderBookings =
    bookings &&
    bookings.map((b) => {
      console.log("b.venueName", b);
      return (
        <div key={b.id}>
          <h4>{b.venueName}</h4>
          <p> booking start: {b.bookingStatus.bookingStart}</p>
          <p>booking End: {b.bookingStatus.bookingEnd}</p>
          <p>{b.bookingStatus.bookingDescription}</p>
        </div>
      );
    });
  return <>{renderBookings}</>;
};

export default Bookings;
