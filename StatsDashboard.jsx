import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatsDashboard = ({ tasks }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const completedTasks = tasks.filter((t) => t.completed && t.date);

  const monthlyCounts = Array(12).fill(0);
  completedTasks.forEach((task) => {
    const date = new Date(task.date);
    const month = date.getMonth();
    if (!isNaN(month)) {
      monthlyCounts[month]++;
    }
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Completed Tasks",
        data: monthlyCounts,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Completed Task Stats</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StatsDashboard;
