import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function TotalUsers({users}) {
  const data = {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        label: "# of Votes",
        data: [users?.totalActiveUsers, users?.totalBlockedUsers],
        backgroundColor: ["rgb(217, 91, 127,0.99)", "rgba(67, 67, 107,0.99)"],
        borderColor: ["rgba(0, 99, 132, 1)", "rgba(0, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
