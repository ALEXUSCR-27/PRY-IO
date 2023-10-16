import React from "react";
import { Link } from "react-router-dom";

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