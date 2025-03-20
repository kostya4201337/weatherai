// import React from "react";

import { Link } from 'react-router-dom';

import './Navbar.css'
import logo from "./logo.png"
import faqIcon from "./faq-icon.png"
import {useState} from "react";
export const Navbar = () => {

    const [selectedButton, setSelectedButton] = useState<string>();

    const handleClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    }

    return (
        <nav className="navbar">
            <div className="buttons-container">
                <Link to={"/"} className="button" onClick={() => handleClick("logo")}><img src={logo} alt="logo" className="logo"/></Link>
                <Link to={"/monthly"} onClick={() => handleClick("monthly")} className={selectedButton == "monthly" ? "button button-selected" : "button"}>Прогноз на месяц</Link>
                <Link to={"/archive"} onClick={() => handleClick("archive")} className={selectedButton == "archive" ? "button button-selected" : "button"}>Архив прогнозов</Link>
                <div className="about-container">
                    <Link to={"/about"} onClick={() => handleClick("about")} className={selectedButton == "about" ? "button button-selected" : "button"}><img src={faqIcon} alt="about-icon" className="about-icon"/></Link>
                </div>
            </div>
        </nav>
    );
};