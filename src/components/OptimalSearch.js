import React, {useState} from "react";
import NavBar from "./NavBar";

import '../styles/optimal-tree.css'

function OptimalSearch() {

    const [keys, setKeys] = useState([1,2,3,4]);
    const [probabilities, setProbabilities] = useState([0.18,0.32,0.39,0.11]);
    //const [keys, setKeys] = useState([]);
    //const [probabilities, setProbabilities] = useState([]);
    const [cantKeys, setCantKeys] = useState(10);
    const [flag, setFlag] = useState(false);
    const [rows, setRows] = useState([]);
    const [p, setp] = useState([]);
    const [cost, setCost] = useState([]);
    const [rTable, setRTable] = useState([]);
    const [jsonObject, setJsonObject] = useState({});

    const generateOptimalTree = () => {
        let contKeys = keys.length;
        let costArray = new Array(contKeys);
        let R = new Array(contKeys);
        let visited = new Array(contKeys);
        for (let i = 0; i < contKeys; i++) { //Genero la tabla de costos
            costArray[i] = new Array(contKeys);
            visited[i] = new Array(contKeys);
            R[i] = new Array(contKeys);
        }

        for (let i = 0; i < contKeys; i++) { 
            for (let j = 0; j < contKeys; j++) {
                R[i][j] = 0;
            }
            
        }

  
        /* cost[i][j] = Optimal cost of binary search tree
        that can be formed from keys[i] to keys[j].
        cost[0][cantKeys-1] will store the resultant cost */
        // For a single key, cost is equal to frequency of the key
        for (let i = 0; i < contKeys; i++) {
            costArray[i][i] = probabilities[i];
            visited[i][i] = -1;
        }
    
        // Now we need to consider chains of length 2, 3, ... .
        // L is chain length.
        for (let L = 2; L <= contKeys; L++) {
            // i is row number in cost[][]
            for (let i = 0; i <= contKeys-L+1; i++) {
                // Get column number j from row number i and
                // chain length L
                let j = i+L-1;
                let off_set_sum = sum(probabilities, i, j);
                if ( i >= contKeys || j >= contKeys)
                    break

                costArray[i][j] = Number. MAX_SAFE_INTEGER;
                visited[i][j] = -1;
    
                // Try making all keys in interval keys[i..j] as root
                for (let r = i; r <= j; r++) {
                    console.log("i:"+i);
                    console.log("L:"+L);
                    console.log("j:"+j);
                    console.log("r:"+r);
                    console.log("offset:"+off_set_sum);
                    // c = cost when keys[r] becomes root of this subtree
                    let c = 0;
                    if (r > i)
                        c += costArray[i][r-1]
                    if (r < j)
                        c += costArray[r+1][j]
                    c += off_set_sum;
                    console.log("c:"+c);
                    console.log("cost:"+costArray[i][j]);   
                    if (c < costArray[i][j]) {
                        costArray[i][j] = c;
                        visited[i][j] = r+1;
                    }
                }
            }
        }
        console.log(visited);
        for (let i = 0; i < contKeys; i++) { 
            for (let j = 0; j < contKeys; j++) {
                if (costArray[i][j] == undefined) {
                    costArray[i][j] = 0;
                }
            }
            
        }
        setRTable(visited);
        return costArray;
}
  
// A utility function to get sum of array elements
// probabilities[i] to probabilities[j]
function sum(probabilities, i, j) {
    let s = 0;
    for (let k = i; k <= j; k++)
        s += probabilities[k];
    return s;
}

    const generateRows = () => {
        const tempRows = [];
        for (let i=1;i<=cantKeys;i++) {
            tempRows.push(i);
        }
        //console.log(tempRows);

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
        /*
        let total = 0;
        for (let i=0;i<cantKeys;i++) {
            total+=p[i];
        }

        const temp = probabilities;
        for (let j=0;j<cantKeys;j++) {
            temp[j] = p[j]/total;
        }
        setProbabilities(temp);
        //console.log(probabilities);
*/
        const cost = generateOptimalTree();
        setCost(cost);
        console.log("Costo óptimo de búsqueda:", cost);

    }

    const generateArchive = () => {
        if (keys.length !== p.length) {
          throw new Error('Las listas keys y p deben tener la misma longitud.');
        }
      
        const datos = {};
        const fileName = "ArbolesBusquedaOptima.json"
      
        for (let i = 0; i < keys.length; i++) {
            datos[keys[i]] = p[i];
        }

        
        const jsonStr = JSON.stringify(datos, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }

      const handleFileChange = async (e) => {
        let temp = [];
        try {
            const parsedData = await readJsonFile(e.target.files[0]);
            
            console.log(Object.values(parsedData));
            console.log(Object.keys(parsedData));
            temp = Object.keys(parsedData);
            setKeys(temp);
            console.log(keys);
            
            
        }
        catch(error) {

        }
        
        
      };
    
      const readJsonFile = (file) =>
        new Promise((resolve, reject) => {
            const fileReader = new FileReader()

            fileReader.onload = event => {
            if (event.target) {
                resolve(JSON.parse(event.target.result))
            }
            }

            fileReader.onerror = error => reject(error)
            fileReader.readAsText(file)
    })


    const guardar = (temp) => {
        setKeys(temp);
        console.log(keys);
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
                            <div style={{marginTop:"10px"}}>
                                <input type="file" accept=".json" className="load-archive-input"  onChange={handleFileChange}></input>
                                <button className="save-program-button" onClick={generateArchive}>GUARDAR PROGRAMA</button>
                            </div>
                            
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
                                                    <td>Llave: {key}</td>
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
                        <table>
                            <tbody>
                                {cost.map((fila, filaIndex) => (
                                <tr key={filaIndex}>
                                    {fila.map((valor, colIndex) => (
                                    <td key={colIndex}>{valor}</td>
                                    ))}
                                </tr>
                                ))}
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                {rTable.map((fila, filaIndex) => (
                                <tr key={filaIndex}>
                                    {fila.map((valor, colIndex) => (
                                    <td key={colIndex}>{valor}</td>
                                    ))}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                
            </main>
        </div>
    );
}

export default OptimalSearch;