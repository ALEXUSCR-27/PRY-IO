import React from "react";
import NavBar from "./NavBar";
function SportSeries() {

    function calcularProbabilidadesSerieNormal(probabilidadEquipoA, probabilidadEquipoB) {
        // Inicializamos la tabla 5x5
        const tabla = new Array(5);
        for (let i = 0; i < 5; i++) {
          tabla[i] = new Array(5).fill(0);
        }
      
        // Llenamos la primera fila con 1s
        for (let i = 0; i < 5; i++) {
          tabla[0][i] = 1;
        }
      
        // Llenamos la primera columna con 0s
        for (let i = 1; i < 5; i++) {
          tabla[i][0] = 0;
        }
      
        // Llenamos el resto de la tabla usando la fórmula T[i][j] = p * T[i-1][j] + q * T[i][j-1]
        for (let i = 1; i < 5; i++) {
          for (let j = 1; j < 5; j++) {
            const p = probabilidadEquipoA;
            const q = probabilidadEquipoB;
            tabla[i][j] = p * tabla[i - 1][j] + q * tabla[i][j - 1];
          }
        }
      
        // La probabilidad de que el equipo A gane la serie se encuentra en la posición (4, 4)
        const probabilidadEquipoAGanaSerie = tabla[4][4];
        console.log(tabla);
        return probabilidadEquipoAGanaSerie;
      }
      
      function calcularProbabilidadesSerie(formato, probabilidadCasaEquipoA, probabilidadVisitaEquipoA, probabilidadCasaEquipoB, probabilidadVisitaEquipoB) {
        const numJuegos = formato.reduce((acc, val) => acc + val, 0);
      
        // Inicializamos la tabla (numJuegos+1)x(numJuegos+1) con 0s
        const tabla = new Array(numJuegos + 1);
        for (let i = 0; i <= numJuegos; i++) {
          tabla[i] = new Array(numJuegos + 1).fill(0);
        }
      
        // Llenamos la primera fila con 1s
        for (let i = 0; i <= numJuegos; i++) {
          tabla[0][i] = 1;
        }
      
        // Llenamos la primera columna con 0s
        for (let i = 1; i <= numJuegos; i++) {
          tabla[i][0] = 0;
        }
      
        // Llenamos el resto de la tabla usando la fórmula T[i][j] = p * T[i-1][j] + q * T[i][j-1]
        for (let i = 1; i <= numJuegos; i++) {
          for (let j = 1; j <= numJuegos; j++) {
            // Calculamos el partido actual en función del formato
            const partidoActual = i - 4 + j - 4;
      
            let p, q; //revisar aqui
            if (partidoActual < 0) {
              p = probabilidadCasaEquipoA;
              q = probabilidadCasaEquipoB;
            } else {
              p = probabilidadVisitaEquipoA;
              q = probabilidadVisitaEquipoB;
            }
      
            tabla[i][j] = p * tabla[i - 1][j] + q * tabla[i][j - 1];
          }
        }
      
        // La probabilidad de que el equipo A gane la serie se encuentra en la posición (numJuegos, numJuegos)
        const probabilidadEquipoAGanaSerie = tabla[numJuegos][numJuegos];
      
        return probabilidadEquipoAGanaSerie;
      }
      
      
      
      
      // Ejemplo de uso con formato 2-3-2 y probabilidades de equipos
      
      
      
      
      // Ejemplo de uso con probabilidades de Equipo A y Equipo B
      
      
      
      
      
      
      
      
      
      
      
      
      const ejemplo = () => {
        const probabilidadEquipoA = 0.55; // Ejemplo
        const probabilidadEquipoB = 0.45; // Ejemplo
        
        //const resultado = calcularProbabilidadesSerieNormal(probabilidadEquipoA, probabilidadEquipoB);
        
        //console.log("Probabilidad de que Equipo A gane la serie:", resultado);

        // Ejemplo de uso con formato 2-3-2 y probabilidades de equipos
      const formatoSerie = [2, 3, 2];
      const probabilidadCasaEquipoA = 0.52; // Probabilidad de ganar en casa para A
      const probabilidadVisitaEquipoA = 0.48; // Probabilidad de ganar de visita para A
      const probabilidadCasaEquipoB = 0.52; // Probabilidad de ganar en casa para B
      const probabilidadVisitaEquipoB = 0.48; // Probabilidad de ganar de visita para B
      
      const resultado = calcularProbabilidadesSerie(formatoSerie, probabilidadCasaEquipoA, probabilidadVisitaEquipoA, probabilidadCasaEquipoB, probabilidadVisitaEquipoB);
      
      console.log("Probabilidad de que Equipo A gane la serie:", resultado);

      }
      
      


    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <button onClick={ejemplo}>ejemplo</button>
                <h1>ejem1</h1>
            </main>
        </div>
    );
}

export default SportSeries;