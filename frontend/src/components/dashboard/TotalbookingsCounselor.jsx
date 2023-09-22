import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function TotalbookingsCounselor({ bookings }) {
  const data = {
    labels: ["Completed", "Cancelled", "User Cancelled"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          bookings?.completedBookings,
          bookings?.userCancelledBookings,
          bookings?.cancelledBookings,
        ],
        backgroundColor: [
          "rgb(118, 57, 254,0.99)",
          "rgba(248, 86, 119,0.99)",
          "rgba(77, 209, 185, 0.99)",
        ],
        borderColor: [
          "rgba(0, 99, 132, 1)",
          "rgba(0, 99, 132, 1)",
          "rgba(0, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
