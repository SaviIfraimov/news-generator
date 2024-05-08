import React from 'react';
import './SmallBackButton.css';

interface SmallBackButtonProps {
    onClick: () => void;
    text: string;
    type?: "button" | "submit" | "reset";
}

const SmallBackButton: React.FC<SmallBackButtonProps> = ({ text, onClick, type = 'button' }) => {
    return (
        <button className="small-back-button" type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default SmallBackButton;
