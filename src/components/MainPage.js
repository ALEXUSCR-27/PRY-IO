import React from "react";
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';

const floy = () => {
    console.log("funcion");
}


function MainPage() {
    return (
        <div>
            <h1>Hola</h1>
            <Link to = "http://localhost:3000/floyd">
                    <button className="card">registrar</button>
            </Link>
        </div>
    );
    
}

export default MainPage;