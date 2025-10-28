import React from 'react';
import './SearchBar.css';
import '../../components/phone/phone.css';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="ค้นหา Brand หรือ Model..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
