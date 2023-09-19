import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
  ArcElement, // Add ArcElement for doughnut chart
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
  ArcElement // Add ArcElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total Profit Doughnut Chart",
    },
  },
};

const Monthlydata = {
  labels: [
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
  ],
  datasets: [
    {
      data: [5000, 3000, 2000, 3000,5000,1211,2000,3000,2222,2211,1988,2012], // Update data values
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)", // January
        "rgba(255, 99, 132, 0.2)", // February
        "rgba(255, 205, 86, 0.2)", // March
        "rgba(54, 162, 235, 0.2)", // April
        "rgba(153, 102, 255, 0.2)", // May
        "rgba(255, 159, 64, 0.2)", // June
        "rgba(255, 99, 132, 0.2)", // July
        "rgba(75, 192, 192, 0.2)", // August
        "rgba(255, 205, 86, 0.2)", // September
        "rgba(54, 162, 235, 0.2)", // October
        "rgba(153, 102, 255, 0.2)", // November
        "rgba(255, 159, 64, 0.2)", // December
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)", // January
        "rgba(255, 99, 132, 1)", // February
        "rgba(255, 205, 86, 1)", // March
        "rgba(54, 162, 235, 1)", // April
        "rgba(153, 102, 255, 1)", // May
        "rgba(255, 159, 64, 1)", // June
        "rgba(255, 99, 132, 1)", // July
        "rgba(75, 192, 192, 1)", // August
        "rgba(255, 205, 86, 1)", // September
        "rgba(54, 162, 235, 1)", // October
        "rgba(153, 102, 255, 1)", // November
        "rgba(255, 159, 64, 1)", // December
      ],

      borderWidth: 1,
    },
  ],
};
const Weeklydata = {
  labels: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  datasets: [
    {
      data: [5000, 3000, 2000, 3000,5000,1211], // Update data values
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)", // January
        "rgba(255, 99, 132, 0.2)", // February
        "rgba(255, 205, 86, 0.2)", // March
        "rgba(54, 162, 235, 0.2)", // April
        "rgba(153, 102, 255, 0.2)", // May
        "rgba(255, 159, 64, 0.2)", // June
        "rgba(255, 99, 132, 0.2)", // July

      ],
      borderColor: [
        "rgba(75, 192, 192, 1)", // January
        "rgba(255, 99, 132, 1)", // February
        "rgba(255, 205, 86, 1)", // March
        "rgba(54, 162, 235, 1)", // April
        "rgba(153, 102, 255, 1)", // May
        "rgba(255, 159, 64, 1)", // June
        "rgba(255, 99, 132, 1)", // July
 
      ],

      borderWidth: 1,
    },
  ],
};

export const MonthlyProfit = () => {
  return <Doughnut options={options} data={Monthlydata} />;
};
export const WeeklyProfit = () => {
  return <Doughnut options={options} data={Weeklydata} />;
};

