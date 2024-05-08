import React, { useEffect, useState } from 'react';
import './ListFilterInput.css';
import { useSearchParams } from 'react-router-dom';

interface ListFilterInputProps {
  onFilterChange: (filterText: string) => void;
}

const ListFilterInput: React.FC<ListFilterInputProps> = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterText, setFilterText] = useState('');
  
  useEffect(() => {
    setFilterText(searchParams.get('q') || '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({q: e.target.value});
    setFilterText(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <input className="filterInput" type="text" value={filterText} placeholder=' search text' onChange={handleFilterChange} />
  );
};

export default ListFilterInput;
