import React from "react";
import Chart from "react-apexcharts";

export default function PriceBarChart({ priceData }) {
  if (!priceData || priceData.length === 0) return null;

  const car = priceData?.[0] || {};
  const priceNew = Number(car.price_new) || 0;
  const price2024 = Number(car.price_in_2024) || 0;
  const priceTwoHand = Number(car.price_twohand) || 0;
  const labels = ["2023", "2024", "2025"];

  // ✅ ฟังก์ชันสร้างสีแบบสุ่ม
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

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
              distributed: true, // ✅ ทำให้แท่งแยกสี
              columnWidth: "60%",
            },
          },
          colors: [
            getRandomColor(),
            getRandomColor(),
            getRandomColor()
          ], // ✅ <== ตรงนี้ต้องมีเครื่องหมายคอมมา
          legend: { position: "top" },
          dataLabels: { enabled: true },
          tooltip: { y: { formatter: val => `฿${val.toLocaleString()}` } },
        }}
      />
    </div>
  );
}

