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

export const makeShortDate = (date) => {
  return new Date(date).toDateString();
};

export const makeDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const makeFullDate = (date) => {
  return new Date(date).toLocaleString();
};
