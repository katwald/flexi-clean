export const readableDate = (date) => {
  const event = new Date(date);
  const options = {
    weekday: "short",
    // year: "numeric",
    month: "short",
    day: "numeric",
  };
  const time = event.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${event.toLocaleDateString("en-FE", options)} ${time}`;
};
