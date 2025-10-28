// src/components/ReviewPieChart/ReviewPieChart.js
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
        setScores([
          data.exterior || 0,
          data.interior || 0,
          data.value || 0,
          data.fuel_economy || 0,
          data.performance || 0
        ]);
      })
      .catch(err => console.error("Error fetching review data:", err));
  }, [carId]); // ไม่มี warning แล้ว

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
      formatter: (val, opts) => {
        return scores[opts.seriesIndex]; // แสดงแค่ตัวเลข
      },
      style: { fontSize: "20px", fontWeight: "bold" }
    },
    tooltip: {
      y: {
        formatter: (value, opts) => `${scores[opts.seriesIndex]} คะแนน`
      }
    },
    legend: {
      position: "bottom"
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Chart options={options} series={scores} type="pie" width="100%" />
    </div>
  );
}
