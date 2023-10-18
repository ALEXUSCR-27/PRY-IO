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
            </main>
            <Matriz />
        </div>
    );
}

export default Floyd;