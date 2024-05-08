import React from 'react';

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange, totalPages, currentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      {totalPages && <span>Pages: </span>}
      {pageNumbers.map((pageNumber) => (
        <span key={pageNumber} onClick={() => onPageChange(pageNumber)}>
          {pageNumber === currentPage ? <b>{pageNumber}</b> : pageNumber}{' '}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
