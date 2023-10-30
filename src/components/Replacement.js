import React, { Component } from 'react';
import NavBar from "./NavBar";


class Replacement extends Component {
    constructor() {
      super();
      this.state = {
        costoInicial: 0,
        plazoProyecto: 1,
        vidautilEquipo: 1,
        preciosReventa: [], //  para cada unidad de tiempo de uso del equipo el precio de reventa
        costosMantenimiento: [], // para cada unidad de tiempo de uso del equipo el costo de mantenimiento
        ganancias: [], //  ganancia recibida por usar el equipo en cada unidad de su tiempo de vida útil.
        analysisTable: [], // tabla de análisis de cada período mostrando G(t) y los instantes de todos los siguientes reemplazos.
      };
    }
  
    // Implement input handlers for user input
    handlecostoInicialChange = (event) => {
      this.setState({ costoInicial: parseFloat(event.target.value) });
    };
    handleplazoProyectoChange = (event) => {
        this.setState({ plazoProyecto: parseInt(event.target.value,10) });
    };
    handlevidautilChange = (event) => {
        this.setState({ vidautilEquipo: parseInt(event.target.value,10) });
    };
  
    // Add more input handlers for other inputs (project duration, lifetime, costs, profits, etc.)
  
    // Implement a function to calculate the analysis table
    calculateAnalysisTable = () => {
      // Add your logic here to calculate the table based on user input
      // You need to consider the project duration, equipment lifetime, costs, and profits (if applicable)
    };
  
    // Render the input form and analysis table
    render() {
      return (
        <div>
          <div>
            <header>
                <NavBar/>
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
              value={this.state.plazoProyecto}
              onChange={this.handlevidautilChange}
            />
            {/* Add more input fields for project duration, lifetime, costs, profits, etc. */}
            <button onClick={this.calculateAnalysisTable}>Calculate</button>
          </form>
          {/* Display the analysis table here */}
        </div>
      );
    }
  }
  
  export default Replacement;
