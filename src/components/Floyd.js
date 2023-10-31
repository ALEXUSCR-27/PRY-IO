import React from "react";
import NavBar from "./NavBar";
import Matriz from "./floydFunctions/Matriz";
import '../styles/FloydMatriz.css'

function Floyd() {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <h1 className="h1Floyd">Algoritmo de Floyd</h1>                
                <h4 className="h4Floyd">Si desea poner infinitos, deje la celda en blanco</h4>                
            </main>
            <Matriz />
        </div>
    );
}

export default Floyd;