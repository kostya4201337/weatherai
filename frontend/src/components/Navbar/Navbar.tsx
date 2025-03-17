// import React from "react";

import { Link } from 'react-router-dom';

import './Navbar.css'
import logo from "./logo.png"
import faqIcon from "./faq-icon.png"
export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="buttons-container">
                <Link to={"/"} className="button"><img src={logo} alt="logo" className="logo"/></Link>
                <Link to={"/monthly"} className="button">Прогноз на месяц</Link>
                <Link to={"/archive"} className="button">Архив прогнозов</Link>
                <div className="about-container">
                    <Link to={"/about"} className="button"><img src={faqIcon} alt="about-icon" className="about-icon"/></Link>
                </div>
            </div>
        </nav>
    );
};