import React, { useState} from "react";
import NavBar from "./NavBar";
import OptimalTable from "./OptimalTable";

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
            <h1>hoola</h1>
            <button onClick={() => ejemplo()}>si</button>
            { flag && <OptimalTable arrays={tables}/>}
        </div>
      );

}




/*
class Replacement extends Component {
  constructor() {
    super();
    this.state = {
      costoInicial: 0,
      plazoProyecto: 1,
      vidautilEquipo: 1,
      preciosReventa: [], // Para cada unidad de tiempo de uso del equipo el precio de reventa
      precioReventaStr: "",
      costosMantenimiento: [], // Para cada unidad de tiempo de uso del equipo el costo de mantenimiento
      costosMantenimientoStr: "",
      ganancias: [], // Ganancia recibida por usar el equipo en cada unidad de su tiempo de vida útil.
      gananciasStr: "",
      analysisTable: [], // Tabla de análisis de cada período mostrando G(t) y los instantes de todos los siguientes reemplazos.
    };
  }
  handlevidautilChange = (event) => {
    const vidautilEquipo = event.target.value;
    this.setState({ vidautilEquipo });
    console.log("Vida útil del equipo: ", vidautilEquipo);
  };

  handlecostoInicialChange = (event) => {
    const costoInicial = event.target.value;
    this.setState({ costoInicial });
    console.log("Costo inicial: ", costoInicial);
  };

  handleplazoProyectoChange = (event) => {
    const plazoProyecto = event.target.value;
    this.setState({ plazoProyecto });
    console.log("Plazo del proyecto: ", plazoProyecto);
  };

  handlePrecioReventaChange = (event) => {
    const precioReventaStr = event.target.value;
    const precioReventa = precioReventaStr
      .split(",")
      .map((precio) => parseFloat(precio));
    this.setState({ precioReventaStr, preciosReventa: precioReventa });
    console.log("Precio de reventa: ", precioReventa);
  };

  handleCostosMantenimientoChange = (event) => {
    const costosMantenimientoStr = event.target.value;
    const costosMantenimiento = costosMantenimientoStr
      .split(",")
      .map((costo) => parseFloat(costo));
    this.setState({ costosMantenimientoStr, costosMantenimiento });
    console.log("Costos de mantenimiento: ", costosMantenimiento);
  };

  handleGananciasChange = (event) => {
    const gananciasStr = event.target.value;
    const ganancias = gananciasStr.split(",").map((ganancia) =>
      parseFloat(ganancia)
    );
    this.setState({ gananciasStr, ganancias });
    console.log("Ganancias: ", ganancias);
  };

  // Implement a function to calculate the analysis table
  calculateAnalysisTable = (event) => {
    event.preventDefault(); // Previene la recarga de la página
    // Obtén los datos del estado
    const costoInicial = this.state.costoInicial;
    const plazoProyecto = this.state.plazoProyecto;
    const vidautilEquipo = this.state.vidautilEquipo;
    const preciosReventa = this.state.preciosReventa;
    const costosMantenimiento = this.state.costosMantenimiento;
    const ganancias = this.state.ganancias;

    // Lógica para calcular la tabla de análisis
    const analysisTable = [];

    console.log("*************** Datos ingresados: *************** ");
    console.log("Costo inicial: ", costoInicial);
    console.log("Plazo del proyecto: ", plazoProyecto);
    console.log("Vida útil del equipo: ", vidautilEquipo);
    console.log("Precios de reventa: ", preciosReventa);
    console.log("Costos de mantenimiento: ", costosMantenimiento);
    console.log("Ganancias: ", ganancias);
    console.log("****************************** ");
    // Realiza cálculos y llena analysisTable con los resultados
    for (let t = 1; t <= plazoProyecto; t++) {
      // Agrega tu lógica para calcular G(t) y los instantes de reemplazo
      // según los datos ingresados y tus requisitos específicos.
      // Luego, agrega estos valores a la tabla.
    }

    // Ejemplo de uso
    const prices = [10, 15, 12, 5, 8];
    const lifeSpan = 3;

    const maxProfit = maximizeProfit(prices, lifeSpan);
    console.log("Ganancia máxima:", maxProfit);

    this.setState({ analysisTable });

  };

  render() {
    return (
      <div>
        <div>
          <header>
            <NavBar />
          </header>
          <main>
            <h1>Reemplazo de Equipos</h1>
          </main>
        </div>
        <form>
          <label>Costo inicial: </label>
          <input
            type="number"
            step="0.01"
            value={this.state.costoInicial}
            onChange={this.handlecostoInicialChange}
          />
          <label>Plazo del Proyecto: </label>
          <input
            type="number"
            step="0.01"
            value={this.state.plazoProyecto}
            onChange={this.handleplazoProyectoChange}
          />
          <label>Vida Útil del equipo: </label>
          <input
            type="number"
            step="0.01"
            value={this.state.vidautilEquipo}
            onChange={this.handlevidautilChange}
          />
          <br /><br />
          <label>Precios de Reventa (separados por comas): </label>
          <input
            type="text"
            value={this.state.precioReventaStr}
            onChange={this.handlePrecioReventaChange}
          />
          <label>Costos de Mantenimiento (separados por comas): </label>
          <input
            type="text"
            value={this.state.costosMantenimientoStr}
            onChange={this.handleCostosMantenimientoChange}
          />
          <label>Ganancias (separadas por comas): </label>
          <input
            type="text"
            value={this.state.gananciasStr}
            onChange={this.handleGananciasChange}
          />
          <button onClick={this.calculateAnalysisTable}>Calculate</button>
        </form>
        {/* Display the analysis table here /}
      </div>
    );
  }
}
*/
export default Replacement;
