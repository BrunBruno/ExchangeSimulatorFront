export const randomColor = () => {
  const colors = [
    "#F5A623",
    "#F8E71C",
    "#7ED321",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#FF686B",
    "#FFD97D",
    "#66D9EF",
    "#FF75A0",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
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
