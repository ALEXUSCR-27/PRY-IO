import React from "react";
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';

import NavBar from "./NavBar";

const floy = () => {
    console.log("funcion");
}


function MainPage() {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <div style={{display:"flex"}}>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo Floyd Warshall</h2>
                        <Link to = "http://localhost:3000/FloydAlgorithm">
                                <button className="floyd-card" ></button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Mochila</h2>
                        <Link to = "http://localhost:3000/BKAlgorithm">
                                <button className="bk-card"></button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo Reemplazo de Equipos</h2>
                        <Link to = "http://localhost:3000/ReplacementAlgorithm">
                                <button className="rm-card"></button>
                        </Link>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Busqueda Optima</h2>
                        <Link to = "http://localhost:3000/OptimalSearchAlgorithm">
                                <button className="trees-card" ></button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Series Deportivas</h2>
                        <Link to = "http://localhost:3000/SportSeriesAlgorithm">
                                <button className="series-card"></button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Multiplicacion de Matrices</h2>
                        <Link to = "http://localhost:3000/MatrixMulAlgorithm">
                                <button className="matrix-card"></button>
                        </Link>
                    </div>
                </div>
            </main>
            
        </div>
    );
    
}

export default MainPage;