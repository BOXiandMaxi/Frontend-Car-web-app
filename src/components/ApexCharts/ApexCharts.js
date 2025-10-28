import React from "react";
import Chart from "react-apexcharts";

export default function PriceBarChart({ priceData }) {
  if (!priceData) return null;

  const priceNew = Number(priceData.price_new) || 0;
  const price2024 = Number(priceData.price_in_2024) || 0;
  const priceTwoHand = Number(priceData.price_twohand) || 0;
  const labels = ["2023", "2024", "มือสอง"];

  // ฟังก์ชันสุ่มสี
  const getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className="car-price-chart">
      <h3>📊 ราคาตั้งแต่ปี 2023-2025</h3>
      <Chart
        type="bar"
        height={300}
        series={[
          {
            name: "ราคา",
            data: [priceNew, price2024, priceTwoHand],
          },
        ]}
        options={{
          chart: { id: "car-price-chart" },
          xaxis: { categories: labels },
          yaxis: { labels: { formatter: val => val.toLocaleString() } },
          plotOptions: {
            bar: {
              distributed: true, // แยกสีแท่งแต่ละแท่ง
              columnWidth: "60%",
            },
          },
          colors: [getRandomColor(), getRandomColor(), getRandomColor()],
          legend: { position: "top" },
          dataLabels: { enabled: true },
          tooltip: { y: { formatter: val => `฿${val.toLocaleString()}` } },
        }}
      />
    </div>
  );
}
