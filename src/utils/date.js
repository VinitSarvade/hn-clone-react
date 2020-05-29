export const getRelativeTime = (when, now = Date.now()) => {
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  const timeElapsed = now - when;

  let duration, unit;

  if (timeElapsed < minute) {
    duration = Math.round(timeElapsed / 1000);
    unit = "sec";
  } else if (timeElapsed < hour) {
    duration = Math.round(timeElapsed / minute);
    unit = "min";
  } else if (timeElapsed < day) {
    duration = Math.round(timeElapsed / hour);
    unit = "hour";
  } else if (timeElapsed < month) {
    duration = Math.round(timeElapsed / day);
    unit = "days";
  } else if (timeElapsed < year) {
    duration = Math.round(timeElapsed / month);
    unit = "month";
  } else {
    duration = Math.round(timeElapsed / year);
    unit = "year";
  }
  return `${duration} ${unit}${duration > 1 ? "s" : ""} ago`;
};
