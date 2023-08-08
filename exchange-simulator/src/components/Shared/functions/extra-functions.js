export const randomColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

export const showDecimal = (number, position) => {
  return (Math.round(number * 100) / 100).toFixed(position);
};

export const showPrecison = (number) => {
  if (number >= 100) {
    return (Math.round(number * 100) / 100).toFixed(4);
  } else {
    return number.toPrecision(4);
  }
};

export const makeNiceDate = (date) => {
  return new Date(date).toDateString();
};

export const makeDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const makeFullDate = (date) => {
  return new Date(date).toLocaleString();
};

export const makeDuration = (duration) => {
  const keyWords = ["days", "hours", "minutes"];
  duration = duration.replace(".", ":");
  duration = duration.split(":");
  let niceDuration = "";
  for (let i = duration.length - 2; i >= 0; i--) {
    if (parseFloat(duration[i]) === 1) {
      niceDuration =
        duration[i] + " " + keyWords[i].slice(0, -1) + " " + niceDuration;
    } else if (parseFloat(duration[i]) !== 0) {
      niceDuration = duration[i] + " " + keyWords[i] + " " + niceDuration;
    }
  }
  return niceDuration;
};

let timeOut;
export const delayAction = (func, delay) => {
  clearTimeout(timeOut);
  timeOut = setTimeout(func, delay);
};
