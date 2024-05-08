import React, { useState } from 'react';
import './ListFilterInput.css';

interface ListFilterInputProps {
  onFilterChange: (filterText: string) => void;
}

const ListFilterInput: React.FC<ListFilterInputProps> = ({ onFilterChange }) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <input className="filterInput" type="text" value={filterText} placeholder=' search text' onChange={handleFilterChange} />
  );
};

export default ListFilterInput;
