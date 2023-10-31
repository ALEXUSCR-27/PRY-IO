import React from "react";
import { Link } from "react-router-dom";
import '../styles/mainpage.css'

function NavBar() {
    return(
        <div>
            <nav className="navbar">
            <Link to = "http://localhost:3000/">
                <button className="nav-inicio">INICIO</button>
            </Link>
            </nav>
        </div>
    );
};

export default NavBar;