import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function ReviewPieChart({ carId }) {
  const labels = ["ภายนอก", "ภายใน", "ความคุ้มค่า", "ความประหยัดน้ำมัน", "สมรรถนะ"];
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!carId) return;

    fetch(`${BACKEND_URL}/reviews/${carId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Review data:", data);
        setScores([
          Number(data.exterior) || 0,
          Number(data.interior) || 0,
          Number(data.value) || 0,
          Number(data.fuel_economy) || 0,
          Number(data.performance) || 0
        ]);
      })
      .catch(err => console.error("Error fetching review data:", err));
  }, [carId]);

  const options = {
    chart: { type: "pie" },
    labels: labels,
    title: {
      text: "รีวิวและความพึงพอใจ",
      align: "center",
      style: { fontSize: "18px", fontWeight: "bold" }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`, // ใช้ val ที่ ApexCharts ส่งมา
      style: { fontSize: "16px", fontWeight: "bold" }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} คะแนน`
      }
    },
    legend: { position: "bottom" }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Chart options={options} series={scores} type="pie" width="100%" />
    </div>
  );
}
