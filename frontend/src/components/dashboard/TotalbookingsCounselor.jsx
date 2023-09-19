import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "../../redux/features/counselor/counselorActions";

const dispatch = useDispatch();
const bookings = useSelector((state) => state.counselor.bookings);

useEffect(() => {
  dispatch(fetchAllBookings());
}, [dispatch]);

// Chart js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
  responsive: true,
  width: 100,
  height: 200,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = {
  labels,
  datasets: [
    {
      label: "Total",
      data: [12, 19, 3, 5, 2, 3, 10, 10, 2, 3, 5, 5],
      backgroundColor: "rgba(09, 23, 150, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Cancelled",
      data: [12, 19, 3, 5, 2, 3, 10, 10, 2, 3, 5, 5],
      backgroundColor: "rgba(150, 0, 68, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Completed ",
      data: [12, 19, 3, 5, 2, 3, 10, 10, 2, 3, 5, 5],
      backgroundColor: "rgba(11, 128, 0, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const TotalbookingsCounselor = () => {
  return <Bar options={options} data={data} />;
};

export default TotalbookingsCounselor;
