export const dateTimeLocalFormat = (date) => {
  let isoString = date.toISOString();
  return isoString.substring(0, ((isoString.indexOf("T") | 0) + 6) | 0);
};
