import React from 'react';
import './Filter.css';
import '../../components/phone/phone.css';

export default function Filter({ yearOptions, selectedYear, setSelectedYear }) {
  return (
    <select
      className="filter"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      <option value="">All Years</option>
      {yearOptions.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  );
}
