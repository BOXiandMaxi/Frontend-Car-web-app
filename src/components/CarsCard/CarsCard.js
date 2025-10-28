// src/components/CarCard/CarCard.js
import React from 'react';
import './CarsCard.css';

export default function CarCard({ car, onClick }) {
  return (
    <div className="car-card" onClick={onClick}>
      <img
        src={car.image_url}
        alt={`${car.brand} ${car.model}`}
        style={{ width: '100%', height: 150, objectFit: 'cover', marginBottom: 10 }}
      />
      <h3>{car.brand} {car.model}</h3>
      <p>
        Price New: {car.price_new?.toLocaleString() || '-'} | 
        Price Twohand: {car.price_twohand?.toLocaleString() || '-'}
      </p>
    </div>
  );
}
