import React from 'react';
import './SmallBackButton.css';

const SmallBackButton = ({ text, onClick, type = 'button' }) => {
    return (
        <button className="small-back-button" type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default SmallBackButton;
