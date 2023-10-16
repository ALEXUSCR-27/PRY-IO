import React from "react";
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';

const floy = () => {
    console.log("funcion");
}


function MainPage() {
    return (
        <div>
            <div>
                <Link to = "http://localhost:3000/floyd">
                        <button className="floyd-card"></button>
                </Link>
                <Link to = "http://localhost:3000/floyd">
                        <button className="bk-card"></button>
                </Link>
                <Link to = "http://localhost:3000/floyd">
                        <button className="rm-card"></button>
                </Link>
            </div>
            <div>
                <Link to = "http://localhost:3000/floyd">
                        <button className="trees-card"></button>
                </Link>
                <Link to = "http://localhost:3000/floyd">
                        <button className="series-card"></button>
                </Link>
                <Link to = "http://localhost:3000/floyd">
                        <button className="matrix-card"></button>
                </Link>
            </div>
        </div>
    );
    
}

export default MainPage;