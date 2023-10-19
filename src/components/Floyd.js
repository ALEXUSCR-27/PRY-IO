import React from "react";
import NavBar from "./NavBar";
import Matriz from "./floydFunctions/Matriz";

function Floyd() {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <h1>Algoritmo de Floyd</h1>                
                <h4>Si desea poner infinitos, deje la celda en blanco</h4>                
            </main>
            <Matriz />
        </div>
    );
}

export default Floyd;