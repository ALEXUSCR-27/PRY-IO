import React, { useState } from "react";
import NavBar from "./NavBar";

import '../styles/sports.css';

function SportSeries() {

    const [results, setResults] = useState([]);
    const [cantJuegos, setCantJuegos] = useState(0);
    const [probCA, setProbCA] = useState(0.0);
    const [probCB, setProbCB] = useState(0.0);
    const [probVA, setProbVA] = useState(0.0);
    const [probVB, setProbVB] = useState(0.0);
    const [formato, setFormato] = useState([]);
    const [cantPartidosCamp, setCantPartidosCamp] = useState(0);
    const [campA, setCampA] = useState(0);
    const [campB, setCampB] = useState(0);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(false);
    const [f1, setF1] = useState(0);
    const [f2, setF2] = useState(0);
    const [f3, setF3] = useState(0);
    const [cantVueltas, setCantVueltas] = useState(0);

      
      const calcularProbabilidadesSerie = () => {
        if (cantVueltas>2) {
            let temp = [];
            temp[0] = f1;
            temp[1] = f2;
            temp[2] = f3;
            setFormato(temp);
        }
        else {
            let temp = [];
            temp[0] = f1;
            temp[1] = f2;
            setFormato(temp);
        }
        const camp = cantPartidosCamp;
        console.log(cantPartidosCamp);
        let casa1 = formato[0];
        let visita1 = formato[1];
        let casaV;
        let casa2;
        if (formato.lenght > 2) {
            casa2 = formato[2];
            casaV = casa1+visita1;
        }
        
        console.log("Campeon:" + camp);
        // Inicializamos la tabla (cantJuegos+1)x(cantJuegos+1) con 0s
        const tabla = new Array(camp + 1);
        for (let i = 0; i <= camp; i++) {
          tabla[i] = new Array(camp + 1).fill(0);
        }
      
        // Llenamos la primera fila con 1s
        for (let i = 0; i <= camp; i++) {
          tabla[0][i] = 1;
        }
      
        // Llenamos la primera columna con 0s
        for (let i = 1; i <= camp; i++) {
          tabla[i][0] = 0;
        }
      
        // Llenamos el resto de la tabla usando la fórmula T[i][j] = p * T[i-1][j] + q * T[i][j-1]
        for (let i = 1; i <= camp; i++) {
          for (let j = 1; j <= camp; j++) {
            // Calculamos el partido actual en función del formato
            const partidoActual = i - cantPartidosCamp + j - cantPartidosCamp;
            console.log("partidoActu: "+  partidoActual);
            let p, q; //revisar aqui
            if (formato.lenght < 3) {
                if (partidoActual>casa1) {
                    p = probVA;
                    q = probCB;
                }
                else {
                    p = probCA;
                    q = probVB;
                }
            }
            else {
                if (partidoActual>casaV) {
                    p = probCA;
                    q = probVB;
                }
                else {
                    if (partidoActual>casa1) {
                        p = probVA;
                        q = probCB;
                    }
                    else {
                        p = probCA;
                        q = probVB;
                    }
                }
            }
            
            let res = p * tabla[i - 1][j] + q * tabla[i][j - 1]
            tabla[i][j] = res.toFixed(3);
          }

        }
        
        console.log(tabla);
        const result1 = tabla[camp][camp]*100
        const probA = result1.toFixed(2);
        const result2 = (1 -tabla[camp][camp])*100;
        const probB = result2.toFixed(2);
        setCampA(probA);
        setCampB(probB);
        setResults(tabla);
        setFlag(true);
      }
      

    const handleNumJuegos = (e) => {
        const cant = e.target.value;
        setCantJuegos(cant);
        const camp = Math.ceil(cant/2);
        setCantPartidosCamp(camp);
    }

    const handleProbA = (e) => {
        let BV = 1 - e.target.value;
        setProbCA(e.target.value);
        setProbVB(BV);
    }
    const handleProbB = (e) => {
        let AV = 1 - e.target.value;
        setProbCB(e.target.value);
        setProbVA(AV)
    }

    const handleF1 = (e) => {
        setF1(e.target.value);
    }
    const handleF2 = (e) => {
        setF2(e.target.value);
    }
    const handleF3 = (e) => {
        setF3(e.target.value);
    }

    const handleFormato = (e) => {
        let temp = e.target.value;
        setFlag2(true);
        if (temp == 3) {
            setFlag3(true);
            vuelta2();
        }
        else {
            vuelta1();
        }
    }

    const vuelta1 = () => {
        setCantVueltas(2);
        
    }

    const vuelta2 = () => {
        setCantVueltas(3);
        
    }
    


    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <div style={{display:"flex"}}>
                    <div className="right-bar-sports">
                        <h2>Algoritmo de series deportivas</h2>
                        <label className="labels">Numero de juegos:</label>
                        <input type="number" placeholder="MAX:11" onChange={(e) => handleNumJuegos(e)}></input>

                        <label className="labels">Probabilidad de gane para A en casa:</label>
                        <input type="number" onChange={(e) => handleProbA(e)}></input>

                        <label className="labels">Probabilidad de gane para A de visita:</label>
                        <input type="number" onChange={(e) => handleProbB(e)}></input>
                        
                        <label className="labels">Formato</label>
                        <select onChange={(e) => handleFormato(e)}>
                            <option value={"2"}>2 vuelta</option>
                            <option value={"3"}>3 vueltas</option>
                        </select>
                            <div style={{display: "flex",flexDirection: "column"}}>
                                <label className="labels">Primer vuelta</label>
                                <input type="number" onChange={(e) => handleF1(e)}></input>
                                <label className="labels">Segunda vuelta</label>
                                <input type="number" onChange={(e) => handleF2(e)}></input>
                                {flag3 && (
                                    <div style={{display: "flex",flexDirection: "column"}}>
                                        <label className="labels">Tercer vuelta</label>
                                        <input type="number" onChange={(e) => handleF3(e)}></input>
                                    </div>
                                )}
                            </div>
                        <button className="calcular-button-sports" onClick={calcularProbabilidadesSerie}>CALCULAR</button>

                    </div>
                    <div className="left-side-sports">
                        {flag && (
                            <div>
                                <h2>Tabla de probabilidades para un campeonato ({cantPartidosCamp},{cantPartidosCamp})</h2>
                            </div>
                        )}  
                        <table>
                            <tbody>
                                {results.map((fila, filaIndex) => (
                                <tr key={filaIndex}>
                                    {fila.map((valor, colIndex) => (
                                    <td key={colIndex}>{valor}</td>
                                    ))}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            {flag && (
                                <div>
                                    <h2>La probabilidad de que el equipo A quede campeon es del {campA}%</h2>
                                    <h2>La probabilidad para el equipo de B de quedar campeon es del {campB}%</h2>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                
            </main>
        </div>
    );
}

export default SportSeries;