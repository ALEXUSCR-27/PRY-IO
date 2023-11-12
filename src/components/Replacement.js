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

      const optimalReplacement = () => {
        const prices = [400, 300, 250];
        const maintenance = [30, 40, 60];
        const initPrice = 500;
        const life = 3;
        const totalTime = 5;
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
                //console.log(g);
                cont++;
            }
        }
        setTableT(t);
        setTableP(p);
        setTableG(g);
        setTables([t, g, p])
        setFlag(true);
        console.log(p);
        console.log("g:"+g);
        console.log("t:"+t);
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
      
      // Ejemplo de uso
      const ejemplo = () => {
        const precioVenta = [400, 300, 250];
        const costoMantenimiento = [30, 40, 60];
        const vidaUtil = 3;
        const anosTrabajo = 5;
        const initPrice = 500;
        console.log("si");
      const resultado = optimalReplacement();
      }
      
      

      return (
        <div>
            <main>
                <div style={{display:"flex"}}>
                    <div className="right-bar-replacement">
                        <label>Precio inicial</label>
                        <input></input>
                        
                        <label>Tiempo maximo</label>
                        <input></input>

                        <label>Años de vida util</label>
                        <input></input>

                        
                    </div>
                    <div className="left-side-replacement"></div>
                </div>
            </main>
            <h1>hoola</h1>
            <button onClick={() => ejemplo()}>si</button>
            { flag && <OptimalTable arrays={tables}/>}
        </div>
      );

}


export default Replacement;
