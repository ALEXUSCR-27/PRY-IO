import React, {useState} from "react";
import NavBar from "./NavBar";

import '../styles/optimal-tree.css'

function OptimalSearch() {

    const [keys, setKeys] = useState([]);
    const [probabilities, setProbabilities] = useState([]);
    const [cantKeys, setCantKeys] = useState(10);
    const [flag, setFlag] = useState(false);
    const [rows, setRows] = useState([]);
    const [p, setp] = useState([]);

    const generateOptimalTree = () => {
        var cantKeys = keys.length;
        var cost = new Array(cantKeys);
    for (var i = 0; i < cantKeys; i++)
        cost[i] = new Array(cantKeys);
  
    /* cost[i][j] = Optimal cost of binary search tree
    that can be formed from keys[i] to keys[j].
    cost[0][cantKeys-1] will store the resultant cost */
  
    // For a single key, cost is equal to frequency of the key
    for (var i = 0; i < cantKeys; i++)
        cost[i][i] = probabilities[i];
  
    // Now we need to consider chains of length 2, 3, ... .
    // L is chain length.
    for (var L = 2; L <= cantKeys; L++)
    {
        // i is row number in cost[][]
        for (var i = 0; i <= cantKeys-L+1; i++)
        {
            // Get column number j from row number i and
            // chain length L
            var j = i+L-1;
            var off_set_sum = sum(probabilities, i, j);
            if ( i >= cantKeys || j >= cantKeys)
                break
            cost[i][j] = Number. MAX_SAFE_INTEGER;
  
            // Try making all keys in interval keys[i..j] as root
            for (var r = i; r <= j; r++)
            {
            // c = cost when keys[r] becomes root of this subtree
            var c = 0;
            if (r > i)
                c += cost[i][r-1]
            if (r < j)
                c += cost[r+1][j]
            c += off_set_sum;
            if (c < cost[i][j])
                cost[i][j] = c;
            }
        }
    }
    return cost;
}
  
// A utility function to get sum of array elements
// probabilities[i] to probabilities[j]
function sum(probabilities, i, j)
{
    let s = 0;
    for (let k = i; k <= j; k++)
        s += probabilities[k];
    return s;
}
      // Ejemplo de uso

    const ejemplo = () => {
        const cost = generateOptimalTree();
        console.log("Costo óptimo de búsqueda:", cost);
    }

    const generateRows = () => {
        const tempRows = [];
        for (let i=1;i<=cantKeys;i++) {
            tempRows.push(i);
        }
        console.log(tempRows);

        setRows(tempRows);
        setp(tempRows);
        
    }

    const setCantRows = (e) => {
        setCantKeys(parseInt(e.target.value));
    }

    const manageKey = (val, e) => {
        const temp = keys;
        temp[val] = e.target.value;
        setKeys(temp);
    }

    const manageValue = (val, e) => {
        const temp = p;
        temp[val] = parseFloat(e.target.value);
        setp(temp)
    }

    const generateTree = () => {
        
        let total = 0;
        for (let i=0;i<cantKeys;i++) {
            total+=p[i];
        }

        const temp = probabilities;
        for (let j=0;j<cantKeys;j++) {
            temp[j] = p[j]/total;
        }
        setProbabilities(temp);
        console.log(probabilities);


        ejemplo();

    }
      

    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <div style={{display:"flex"}}>
                    <div className="right-bar-tree">
                        <div className="keys-section">
                            <label className="keys-title">Cantidad de llaves:</label>
                            <input type= "number" className="keys-cantInput" placeholder="Ej:10" onChange={(e) => setCantRows(e)}></input>
                            <button className="generateRows-button" onClick={generateRows}>CONF. LLAVES</button>
                            <button onClick={generateTree}>GENERAR ARBOL</button>
                            <button>CARGAR ARCHIVO</button>
                            <button>GUARDAR PROGRAMA</button>
                        </div>
                        <div className="div-table">
                            <table>
                                <thead>
                                    <tr className="table-header">
                                        <th>Llaves</th>
                                        <th>Codigo de llave</th>
                                        <th>Valor de llave</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rows.map((val, key) => {
                                            return (
                                                <tr key={key} className="tr-body">
                                                    <td>Llave: {val}</td>
                                                    <td>
                                                        <input onChange={(e) => manageKey(val-1, e)}></input>
                                                    </td>
                                                    <td>
                                                        <input onChange={(e) => manageValue(val-1, e)}></input>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="left-side-tree">
                    </div>
                </div>
                
                
            </main>
        </div>
    );
}

export default OptimalSearch;