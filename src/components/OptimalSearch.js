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
    const [cost, setCost] = useState([]);
    const [rTable, setRTable] = useState([]);
    const [jsonObject, setJsonObject] = useState({});
    const [optimalCost, setOptimalCost] = useState(0);
    const [flag2, setFlag2] = useState(false);

    const generateOptimalTree = () => {
        ordenar();
        let contKeys = keys.length;
        let costArray = new Array(contKeys);
        let R = new Array(contKeys);

        for (let i = 0; i < contKeys; i++) { //Genero la tabla de costos
            costArray[i] = new Array(contKeys);
            R[i] = new Array(contKeys);
        }

        for (let i = 0; i < contKeys; i++) { 
            for (let j = 0; j < contKeys; j++) {
                R[i][j] = 0;
            }
            
        }


        for (let i = 0; i < contKeys; i++) {
            costArray[i][i] = probabilities[i];
            R[i][i] = -1;
        }
    
        for (let L = 2; L <= contKeys; L++) {
            for (let i = 0; i <= contKeys-L+1; i++) {
                let j = i+L-1;
                let off_set_sum = sum(probabilities, i, j);
                if ( i >= contKeys || j >= contKeys)
                    break

                costArray[i][j] = Number. MAX_SAFE_INTEGER;
                R[i][j] = -1;

                for (let r = i; r <= j; r++) {
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
                        R[i][j] = r+1;
                    }
                }
            }
        }
        console.log(R);
        for (let i = 0; i < contKeys; i++) { 
            for (let j = 0; j < contKeys; j++) {
                if (costArray[i][j] == undefined) {
                    costArray[i][j] = 0;
                }
                if (R[i][j] == undefined || R[i][j] == -1) {
                    R[i][j] = 0;
                }
            }
            
        }
        setRTable(R);
        return costArray;
}
  
const esDecimal = (numero) => {
    return numero % 1 !== 0;
}

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
        if (probabilities.length>0) {
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

            const cost = generateOptimalTree();
            setCost(cost);
            setOptimalCost(cost[0][cantKeys-1]);
            setFlag2(true);
            console.log("Costo óptimo de búsqueda:", cost[0][cantKeys-1]);
        }

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

    const ordenar = () => {

        let listaCombinada = keys.map((string, index) => ({ string, costo: p[index] }));

        listaCombinada.sort((a, b) => a.string.localeCompare(b.string));

        let listaOrdenadaDeStrings = listaCombinada.map(item => item.string);
        let listaOrdenadaDeCostes = listaCombinada.map(item => item.costo);

        console.log(listaOrdenadaDeStrings);
        console.log(listaOrdenadaDeCostes);
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
                            <button className="generateRows-button" onClick={generateTree}>GENERAR ARBOL</button>
                            <div style={{marginTop:"10px"}}>
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
                        {flag2 && (
                            <div>
                                <h1>Tabla A</h1>
                            </div>
                        )} 
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
                        {flag2 && (
                            <div><h1>Tabla R</h1></div>
                        )}        
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
                        {flag2 && (
                            <div>
                                <h1>Costo promedio Óptimo: {optimalCost}</h1>
                            </div>
                        )}
                        
                    </div>
                </div>
                
                
            </main>
        </div>
    );
}

export default OptimalSearch;