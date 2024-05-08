import React from 'react';
import Button from '../../Button/Button';
import './ListFilterButtons.css';

interface ListFilterButtonsProps {
    setCategory: (category: string) => void;
}

const ListFilterButtons: React.FC<ListFilterButtonsProps> = ({ setCategory }) => {
    return (
        <div className="articlesCategoryFilterButtons">
            <p>
                <Button text="entertainment" onClick={() => setCategory('entertainment')} />
                <Button text="general" onClick={() => setCategory('general')} />
                <Button text="business" onClick={() => setCategory('business')} />
            </p>
            <p>
                <Button text="health" onClick={() => setCategory('health')} />
                <Button text="sport" onClick={() => setCategory('sport')} />
                <Button text="science" onClick={() => setCategory('science')} />
            </p>
            <p>
                <Button text="technology" onClick={() => setCategory('technology')} />
            </p>
        </div>
    );
};

export default ListFilterButtons;
