import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filter from '../../components/Filter/Filter';
import BrandDropdown from '../../components/Sort/BrandDropdown';
import Pagination from '../../components/Pagination/Pagination';
import CarCard from '../../components/CarsCard/CarsCard';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 track path changes
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is undefined! ตรวจสอบ .env");
      return;
    }

    const url = `${BACKEND_URL}/cars/`;
    console.log("Fetching cars from:", url);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
        return res.json();
      })
      .then(data => setCars(data))
      .catch(err => {
        console.error("Fetch error:", err);
        setCars([]);
      });
  }, [BACKEND_URL, location.pathname]); // 👈 เพิ่ม location.pathname เพื่อ fetch ใหม่ทุกครั้ง path เปลี่ยน

  const yearOptions = [...new Set(cars.map(car => car.year))];
  const brandOptions = [...new Set(cars.map(car => car.brand))];

  const filteredCars = cars
    .filter(car => 
      (car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
       car.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedYear ? car.year === parseInt(selectedYear) : true) &&
      (selectedBrand ? car.brand === selectedBrand : true)
    );

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const displayedCars = filteredCars.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      <Hero />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter 
        yearOptions={yearOptions} 
        selectedYear={selectedYear} 
        setSelectedYear={setSelectedYear} 
      />
      <BrandDropdown 
        brandOptions={brandOptions} 
        selectedBrand={selectedBrand} 
        setSelectedBrand={setSelectedBrand} 
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {displayedCars.map(car => (
          <CarCard key={car.id} car={car} onClick={() => navigate(`/cars/${car.id}`)} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
