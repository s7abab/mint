import React from "react";
import { Line } from "react-chartjs-2";

// Register Chart.js plugins and scales
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function TotalProfit({monthlyProfits}) {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Total Fee and Profit",
      },
    },
  };

  // Labels for the x-axis (months)
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

  // Data for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "Total Fee",
        data: labels.map((month, index) => {
          const result = monthlyProfits.find(
            (item) => item._id.month === index + 1
          );
          return result ? result.totalFee : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: true,
        label: "Profit",
        data: labels.map((month, index) => {
          const result = monthlyProfits.find(
            (item) => item._id.month === index + 1
          );
          return result ? result.profit : 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={chartOptions} data={chartData} />;
}
