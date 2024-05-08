import React from 'react';
import './Header.css';

const Header = ({header}) => {
    return (
        <div>
            <br></br>
            <h1 className="title_header">{header}</h1>
            <br></br>
        </div>
    );
};

export default Header;
