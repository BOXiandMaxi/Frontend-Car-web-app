import React from 'react';
import './BrandDropdown.css';
import '../../components/phone/phone.css';

export default function BrandDropdown({ brandOptions, selectedBrand, setSelectedBrand }) {
  return (
    <select
      className="sort"
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
    >
      <option value="">All Brands</option>
      {brandOptions.map(brand => (
        <option key={brand} value={brand}>{brand}</option>
      ))}
    </select>
  );
}
