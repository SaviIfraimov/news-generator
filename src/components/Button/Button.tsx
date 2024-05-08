import React from 'react';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    text: string;
    type?: "button" | "submit" | "reset";
    selected: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', selected }) => {
    return (
        <button className={`medium-button ${selected && 'selected'}`} type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
