import React, { useState} from "react";
import NavBar from "./NavBar";
import OptimalTable from "./OptimalTable";

import '../styles/Replacement.css'

function Replacement() {

    const [tableT, setTableT] = useState([]);
    const [tableG, setTableG] = useState([]);
    const [tableP, setTableP] = useState([]);
    const [flag, setFlag] = useState(false);
    const [tables, setTables] = useState([]);
    const [rows, setRows] = useState([]);
    const [prices, setPrices] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [life, setLife] = useState(0);
    const [initPrice, setInitPrice] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

      const optimalReplacement = () => {  
        if (validate()) {
            let t = new Array(totalTime + 1).fill(0);
            let g = new Array(totalTime + 1).fill(0);
            let p = new Array(totalTime + 1).fill(0);
            let pricesbyyear = getPricesbyYears(prices, maintenance, initPrice, life);
            let cont = 0;
            for (let i = totalTime; i>=0;i--) {
                if (i === totalTime) {
                    g[cont] = 0;
                    t[cont] = i;
                    p[cont] = 0;
                    cont++;
                }
                else {
                    let min = Number. MAX_SAFE_INTEGER;
                    let actual = 0;
                    let cicle = totalTime - i;
                    if (cicle>life) {
                        cicle = 3;
                    }
                    for (let j = 0;j<cicle;j++) {
                        let tempG = i+j+1;
                        let posP = (tempG - i)-1;
                        let posG = totalTime - tempG;
                        actual = pricesbyyear[posP]+g[posG];
                        if (actual<min) {
                            min = actual;
                            t[cont] = i;
                            g[cont] = actual;
                            p[cont] = tempG;
                        }
                        else {
                            if (actual == min) {
                                if (Array.isArray(p[cont])) {
                                    p[cont].push(tempG);
                                }
                                else {
                                    const temp = p[cont];
                                    p[cont] = [temp,tempG]
                                }
                            }
                        }
                        
                    }
                    cont++;
                }
            }
            setTableT(t);
            setTableP(p);
            setTableG(g);
            setTables([t, g, p])
            setFlag(true);
        }
      }

    const generateRows = () => {
        const tempRows = [];
        for (let i=1;i<=life;i++) {
            tempRows.push(i);
        }
        setRows(tempRows);    
    }

    const managePrices = (val, e) => {
        let tempPrices = new Array(life-1).fill(0);
        if (prices.length == 0) {
            tempPrices[val-1] = parseInt(e.target.value);
            setPrices(tempPrices);
        }
        else {
            tempPrices = prices;
            tempPrices[val-1] = parseInt(e.target.value);
            
            setPrices(tempPrices);
        }
        
        
    }

    const manageMaintance = (val, e) => {
        let tempMaintance = new Array(life-1).fill(0);
        if (maintenance.length == 0) {
            tempMaintance[val-1] = parseInt(e.target.value);
            setMaintenance(tempMaintance);
        }
        else {
            tempMaintance = maintenance;
            tempMaintance[val-1] = parseInt(e.target.value);
            setMaintenance(tempMaintance);
        }
    }

      const getPricesbyYears = (prices, maintenance, initPrice, life) => {
        let res = [];
        for (let i=0;i<=life;i++) {
            let cont = i;
            let actual = maintenance[0];
            for (let j=1;j<=cont;j++ ) {
                actual+=maintenance[j];
            }
            res.push(initPrice+actual-prices[i]);
        }
        return res;
      }

      const handleLife = (e) => {
        setLife(parseInt(e.target.value));
      }
      
      const handleInitPrice = (e) => {
        setInitPrice(parseInt(e.target.value));
      }

      const handleTotalTime = (e) => {
        setTotalTime(parseInt(e.target.value));
      }

      const validate = () => {
        if (prices.length<=0 || maintenance.length<=0 || life <=0 || initPrice<=0 || totalTime<=0 || totalTime<life) {   
            return false;
        }
        return true;
      }
      

      return (
        <div>
            <main>
                <div style={{display:"flex"}}>
                    <div className="right-bar-replacement">
                        <h2>Algoritmo de reemplazo de equipos</h2>
                        <label className="labels">Precio inicial</label>
                        <input type="number" onChange={(e) => handleInitPrice(e)}></input>
                        
                        <label className="labels">Tiempo maximo</label>
                        <input type="number" onChange={(e) => handleTotalTime(e)}></input>

                        <label className="labels">Años de vida util</label>
                        <input type="number" onChange={(e)=>handleLife(e)}></input>

                        <button className="calcular-button-replacement" onClick={generateRows}>CONFIGURAR PRECIOS</button>
                        <table>
                                <thead>
                                    <tr className="table-header">
                                        <th>Precios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rows.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                        <td>Venta Año: {key+1}</td>
                                                        <td>
                                                            <input type="number" onChange={(e) => managePrices(val, e)}></input>
                                                        </td>
                                                        <td>Mantenimiento Año: {key+1}</td>
                                                        <td>
                                                            <input type="number" onChange={(e) => manageMaintance(val, e)}></input>
                                                        </td>
                                                    
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <button className="calcular-button-replacement" onClick={optimalReplacement}>CALCULAR</button>
                    </div>
                    <div className="left-side-replacement">
                        { flag && 
                                <div>
                                    <h1>Tabla de resultados</h1>
                                    <OptimalTable arrays={tables}/>
                                </div>                
                        }
                        
                    </div>
                </div>
            </main>
            
        </div>
      );

}


export default Replacement;
