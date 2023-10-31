import React, { useState } from "react";
import NavBar from "./NavBar";

import '../styles/matrix.css';


function MatrixMul() {
    const [dimensions, setDimensions] = useState(0);
    const [dimensionsList, setDimensionsList] = useState([]);
    const [rows, setRows] = useState([]);
    const [m, setM] = useState([]);
    const [flag, setFlag] = useState(false);
    const [cantMul, setCantMul] = useState(0);

    const generateRows = () => {
        const tempRows = [];
        for (let i=0;i<=dimensions;i++) {
            tempRows.push(i);
        }

        setRows(tempRows);
        
    }

    const MatrixChainOrder = (p , n) => {

        let m = Array(n).fill(0).map(x => Array(n).fill(0));
     
        let i, j, k, L, q;
     
        for (i = 1; i < n; i++)
            m[i][i] = 0;
     
        // L is chain length.
        for (L = 2; L < n; L++) 
        {
            for (i = 1; i < n - L + 1; i++) 
            {
                j = i + L - 1;
                if (j == n)
                    continue;
                m[i][j] = Number.MAX_VALUE;
                for (k = i; k <= j - 1; k++) 
                {
                    // q = cost/scalar multiplications
                    q = m[i][k] + m[k + 1][j]
                        + p[i - 1] * p[k] * p[j];
                    if (q < m[i][j])
                        m[i][j] = q;
                }
            }
        }
        
        setM(m);
        setCantMul(m[1][n - 1]);
        setFlag(true);
        
        return m[1][n - 1];
    }

    const calcular = () => {
        if (dimensionsList.length>0) {
            let arr = dimensionsList;
            console.log(dimensionsList);
            let size = arr.length;
            console.log(MatrixChainOrder(arr, size));
        }
        
    
    }

    const handleDimensions  = (e) => {
        setDimensions(e.target.value);
    }

    const manageDim = (val, e) => {
        console.log(val);
        const temp = dimensionsList;
        temp[val] = parseInt(e.target.value);
        setDimensionsList(temp);
        
    }


    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <div style={{display:"flex"}}>
                    <div className="right-bar-matrix">
                        <label>Numero de matrices</label>
                        <input type="number" onChange={(e) => handleDimensions(e)}></input>
                        <button className="calcular-button" onClick={generateRows}>CONF. DIMENSIONES</button>
                        <table>
                                <thead>
                                    <tr className="table-header">
                                        <th>Llaves</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rows.map((val, key) => {
                                            return (
                                                <tr key={key} className="tr-body">
                                                    <td>Matriz: {key+1}</td>
                                                    <td>
                                                        <input onChange={(e) => manageDim(val, e)}></input>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <button className="calcular-button" onClick={calcular}>CALCULAR</button>
                    </div>
                            

                    <div className="left-side-matrix">
                        <div>
                            {flag && (
                                <div>
                                    <h1>Tabla M</h1>
                                </div>
                                )}        
                                <table>
                                    <tbody>
                                        {m.map((fila, filaIndex) => (
                                        <tr key={filaIndex}>
                                            {fila.map((valor, colIndex) => (
                                            <td key={colIndex}>{valor}</td>
                                            ))}
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {flag && (
                                <div>
                                    <h1>Cantidad de multiplicaciones optima: {cantMul}</h1>
                                </div>
                            )}
                        </div>
                        

                </div>
            </main>
        </div>
    );
}

export default MatrixMul;