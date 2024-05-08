import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <br></br>
            <p className="title_footer">&copy; {new Date().getFullYear()} Article Generator LTD. All rights reserved.</p>
            <br></br>
        </footer>
    );
};

export default Footer;
