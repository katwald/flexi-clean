import React from "react";
import { useSelector } from "react-redux";

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  // this will replace by authentication.
  const userIsSuperVisor = true;

  const handleCancelSchedule = () => {
    // dispatch update booking action here.
  };
  const renderBookings =
    bookings &&
    bookings.map((b) => {
      const { bookingStart, bookingEnd, bookingDescription } = b.bookingStatus;
      const { assignedCleaner } = b.cleaningStatus;

      return (
        <div key={Number(b.id)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              2<h4>{b.venueName}</h4>
              <p> booking start: {bookingStart}</p>
              <p>booking End: {bookingEnd}</p>
              <p>{bookingDescription}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>{assignedCleaner}</p>
              {assignedCleaner && (
                <button onChange={handleCancelSchedule} style={{ height: 32 }}>
                  cancel schedule
                </button>
              )}
              {!assignedCleaner && (
                <button style={{ height: 32 }}>
                  {userIsSuperVisor ? "Asign worker" : "Assign to me"}
                </button>
              )}
            </div>
          </div>
          <hr />
        </div>
      );
    });
  return (
    <div style={{ padding: 20 }}>
      <hr />
      {renderBookings}
    </div>
  );
};

export default Bookings;
