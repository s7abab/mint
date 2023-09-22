import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function TotalCounselors({counselors}) {
const data = {
  labels: ["Active", "Blocked"],
  datasets: [
    {
      label: "# of Votes",
      data: [counselors?.totalActiveCounselors, counselors?.totalBlockedCounselors],
      backgroundColor: [
        "rgb(67, 67, 107,0.99)",
        "rgb(217, 91, 127,0.99)",
     
      ],
      borderColor: [
        "rgba(0, 99, 132, 1)",
        "rgba(0, 99, 132, 1)",
  
      ],
      borderWidth: 1,
    },
  ],
};

  return <Doughnut data={data} />;
}
