export const filterUniqueVenue = (bookings) => {
  let uniqueVenueName = [];
  const uniqueVenueBooking = [
    ...new Map(bookings.map((m) => [m.venueName, m])).values(),
  ];
  uniqueVenueBooking.map((u) => uniqueVenueName.push(u.venueName));
  return uniqueVenueName;
};
