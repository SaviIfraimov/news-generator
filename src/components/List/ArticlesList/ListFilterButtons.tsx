import React from 'react';
import Button from '../../Button/Button';
import './ListFilterButtons.css';
import { categories } from './constants'
import { useSearchParams } from 'react-router-dom';

interface ListFilterButtonsProps {
    setCategory: (category: string) => void;
}

const ListFilterButtons: React.FC<ListFilterButtonsProps> = ({ setCategory }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const buttonCategory = searchParams.get('category')
    
    const {ENTERTAINMENT, GENERAL, BUSINESS, HEALTH, SPORT, SCIENCE, TECHNOLOGY} = categories;
    
    const handleCategoryChange = (category:string) => {
        setSearchParams({category});
        setCategory(category)
    }

    return (
        <div className="articlesCategoryFilterButtons">
            <p>
                <Button text={ENTERTAINMENT} selected={buttonCategory === ENTERTAINMENT} onClick={() => handleCategoryChange(ENTERTAINMENT)} />
                <Button text={GENERAL} selected={buttonCategory === GENERAL} onClick={() => handleCategoryChange(GENERAL)} />
                <Button text={BUSINESS} selected={buttonCategory === BUSINESS} onClick={() => handleCategoryChange(BUSINESS)} />
            </p>
            <p>
                <Button text={HEALTH} selected={buttonCategory === HEALTH} onClick={() => handleCategoryChange(HEALTH)} />
                <Button text={SPORT} selected={buttonCategory === SPORT} onClick={() => handleCategoryChange(SPORT)} />
                <Button text={SCIENCE} selected={buttonCategory === SCIENCE} onClick={() => handleCategoryChange(SCIENCE)} />
            </p>
            <p>
                <Button text={TECHNOLOGY} selected={buttonCategory === TECHNOLOGY} onClick={() => handleCategoryChange(TECHNOLOGY)} />
            </p>
        </div>
    );
};

export default ListFilterButtons;
