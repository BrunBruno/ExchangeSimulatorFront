import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import classes from "./Plot.module.scss";

const Plot = () => {
  const windowWidth = window.innerWidth;
  const data = [
    { name: "January", value: 65 },
    { name: "February", value: 59 },
    { name: "March", value: 80 },
    { name: "April", value: 81 },
    { name: "May", value: 56 },
    { name: "June", value: 55 },
    { name: "July", value: 40 },
  ];

  return (
    <div className={classes.plot}>
      <LineChart width={windowWidth * 0.36} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#22b8cf" />
      </LineChart>
    </div>
  );
};

export default Plot;
