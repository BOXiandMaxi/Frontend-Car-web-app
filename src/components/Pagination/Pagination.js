import React from 'react';
import './Pagination.css';
import '../../components/phone/phone.css';

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map(page => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
