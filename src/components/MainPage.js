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
                                    <p className="card-overlay">El algoritmo de Floyd es un algoritmo utilizado para encontrar las rutas más cortas entre todos los pares de nodos en un grafo dirigido y con ponderaciones o pesos en las aristas. Desarrollado por el premio Turing, Robert W. Floyd, utiliza la programación dinámica para obtener las distancias óptimas, permitiendo pasar por cualquier nodo. Puede volverse lento en grafos grandes. Sin embargo, es una herramienta poderosa para encontrar todas las rutas más cortas en un grafo ponderado.</p>
                                </button>
                        </Link>
                        
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Mochila</h2>
                        <Link to = "http://localhost:3000/BKAlgorithm">
                                <button className="bk-card">
                                    <p className="card-overlay">El algoritmo de la mochila o "knapsack problem", es un problema de optimización de espacio que implica seleccionar un conjunto de objetos que tienen un valor y un peso, de manera que se determine la combinación óptima de objetos que quepa en la mochila y se maximice el valor total. Se aplica el principio de optimalidad si la capacidad de la mochila es menor. Existen dos tipos: 	
                                    • Bounded Knapsack (mochila limitada): k_i copias del objeto i.
                                    • Unbounded Knapsack (mochila ilimitada): hay un numero infinito de copias de cada objeto</p>
                                </button>
                        </Link>
                    </div>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo Reemplazo de Equipos</h2>
                        <Link to = "http://localhost:3000/ReplacementAlgorithm">
                                <button className="rm-card">
                                    <p className="card-overlay">El algoritmo de reemplazo de equipos es un proceso para tomar decisiones sobre cuándo retirar o reemplazar activos, en función del costo del activo (Costo = Compra + Mantenimiento - Venta) de acuerdo al tiempo de antigüedad del mismo. Así, este algoritmo funciona para obtener el plan óptimo de reemplazo del equipo. Por ejemplo, las empresas tienen que tener protocolos de reemplazo de equipos, como de computadoras, ya que estas pierden su vida útil a lo largo de los años.</p>
                                </button>
                        </Link>
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <div>
                        <h2 style={{top:"50px", left:"100px"}} className="h2-main" >Algoritmo de Arboles Optimos de Busqueda</h2>
                        <Link to = "http://localhost:3000/OptimalSearchAlgorithm">
                                <button className="trees-card" >
                                    <p className="card-overlay">
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
                                    <p className="card-overlay">
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
                                    <p className="card-overlay">
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