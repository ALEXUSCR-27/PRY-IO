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
                                <button className="floyd-card" >
                                    <p class="card-overlay"></p>
                                </button>
                        </Link>
                        
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Mochila</h2>
                        <Link to = "http://localhost:3000/BKAlgorithm">
                                <button className="bk-card">
                                    <h3 class="card-overlay">Texto al pasar el ratón</h3>
                                </button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo Reemplazo de Equipos</h2>
                        <Link to = "http://localhost:3000/ReplacementAlgorithm">
                                <button className="rm-card">
                                    <h3 class="card-overlay">Texto al pasar el ratón</h3>
                                </button>
                        </Link>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Arboles Optimos de Busqueda</h2>
                        <Link to = "http://localhost:3000/OptimalSearchAlgorithm">
                                <button className="trees-card" >
                                    <p class="card-overlay">
                                    También conocidos como ABBO, se utilizan para organizar elementos en un árbol binario con el objetivo de minimizar los tiempos promedios de búsqueda, 
                                    esta estructura tiene los nodos ordenados de manera que la rama izquierda tiene los nodos menores que su respectiva raíz, al contrario de su rama derecha 
                                    que contiene los mayores. Para la construcción de este árbol es necesario determinar la probabilidad de acceso de cada elemento y utilizar esa para diseñar 
                                    el árbol de búsqueda de manera que se minimice el costo promedio de búsqueda.
                                    </p>
                                </button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Series Deportivas</h2>
                        <Link to = "http://localhost:3000/SportSeriesAlgorithm">
                                <button className="series-card">
                                    <p class="card-overlay">
                                    Este es un algoritmo que busca determinar la probabilidad que tiene uno de dos equipos de ganar o perder un campeonato, además, estas series 
                                    deportivas tienen varias características importantes como la cantidad de partidos que se juegan en total, la cantidad de partidos que un equipo 
                                    necesita ganar para quedar campeón y las probabilidades predeterminadas que tiene cada equipo si juegan de manera local o de visita, este último dato 
                                    puede no ser siempre tomado en cuenta y se asume que los equipos están jugando en un mismo estadio cada uno con sus respectivas probabilidades iniciales.

                                    </p>
                                </button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Multiplicacion de Matrices</h2>
                        <Link to = "http://localhost:3000/MatrixMulAlgorithm">
                                <button className="matrix-card">
                                    <p class="card-overlay">
                                    Este algoritmo busca determinar la mejor secuencia de multiplicaciones entre matrices, de manera que se logre minimizar la cantidad de multiplicaciones, este algoritmo utiliza una tabla 
                                    de valores para almacenar las soluciones más óptimas, luego de realizar el cálculo de las matrices utiliza esta tabla para trazar el orden de matrices que se deben de multiplicar para obtener 
                                    la cantidad de operaciones más óptima. Para este algoritmo es muy importante conocer la cantidad de matrices que se van a multiplicar, así como sus respectivas dimensiones.
                                    </p>
                                </button>
                        </Link>
                    </div>
                </div>
            </main>
            
        </div>
    );
    
}

export default MainPage;