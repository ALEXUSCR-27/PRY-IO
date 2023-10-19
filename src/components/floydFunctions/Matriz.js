
import React, { Component } from 'react';
class Matriz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numNodos: 0,
      distancias: [],
      iteracion: 0,
      distanciasMatriz: []
    };
  }


  CalculateFloyd = () => {
    
    const matrix = [...this.state.distanciasMatriz];
    const dimension = this.state.numNodos; 
    
    let nodoActual = this.state.iteracion-1;//se resta 1 porque el array empieza en 0

    // Algoritmo de Floyd
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {  
            matrix[i][j] = Math.min(matrix[i][j], matrix[i][nodoActual] + matrix[nodoActual][j]);

        }             
    }
    this.setState({ distanciasMatriz: matrix });
  }

  showMatriz = () => {
    for (let i = 0; i < this.state.numNodos; i++) {
      for (let j = 0; j < this.state.numNodos; j++) {
        console.log("valor de matrix[",i,"]","[",j,"]: \n");
        console.log(this.state.distanciasMatriz[i][j]);        
      }
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();//para prevenir el comportamiento predeterminado asociado a un evento
    console.log('Número de nodos:',this.state.numNodos);
    console.log('Distancias:',this.state.distancias);

    //Si la iteracion actual es 0, se crea una matriz bidimensional a partir del array unidimensional
    if (this.state.iteracion === 0){
      const matrix = [];      
      for (let i = 0; i < this.state.numNodos; i++) {
        const row = this.state.distancias.slice(i * this.state.numNodos, (i + 1) * this.state.numNodos);
        matrix.push(row);
      }
      this.state.distanciasMatriz = matrix;
      //se muestra la matriz D(0)
      console.log("Resultado de la iteración #0");
      //console.log("Matriz: \n", this.state.distanciasMatriz);
      this.showMatriz();
    }else{
      if (this.state.iteracion > this.state.numNodos){
        //se llego a la solucion optima
        window.alert("Ya se ha llegado a la solución óptima");
        console.log("Solución óptima: \n");
        this.showMatriz();
      }else{
        //llamar al algoritmo de floyd
        this.CalculateFloyd();
        //se muestran los resultados
        console.log("Resultado de la iteración #",this.state.iteracion,"\n");
       
        this.showMatriz();
      }      
    }
    //se incrementa a la iteracion siguiente
    this.state.iteracion = parseInt(this.state.iteracion+1,10);  
  }
  
  handleNumNodosChange = (event) => {
    event.preventDefault();//para prevenir el comportamiento predeterminado asociado a un evento
    const numNodos = parseInt(event.target.value, 10);//if void, it is NaN
    const distancias = [];
    const iteracion = parseInt(0, 10);
    const matrizBidireccional = [];

    console.log('Número de nodos:',numNodos); 

    //setea los valores por defecto en el arrray de distancias
    for (let i = 0; i < numNodos*numNodos; i++) {
      for (let j = 0; j < numNodos*numNodos; j++) {
        const index = i * numNodos + j;
        const isOnDiagonal = index % (numNodos + 1) === 0;
        if (isOnDiagonal) {
            distancias[i,j] = parseInt(0, 10);
        } else {
          distancias[i,j] = Infinity;
        }
      }
    }
    console.log(distancias);

    this.setState({ numNodos, distancias, iteracion,matrizBidireccional});
                 
  };


  validarDiagonal = (valor, i, j) => {
    const index = i * this.state.numNodos + j;
    const isOnDiagonal = index % (this.state.numNodos + 1) === 0;
    if (isOnDiagonal) {
      if (valor != parseInt(0, 10)){
        window.alert("El valor está en la diagonal, se seteará como 0");
        //faltaria algun metodo que revierta el cambio en el input a 0
      }
        this.state.distancias[index] = parseInt(0, 10);
    } else {
      this.state.distancias[index] = parseInt(valor, 10);
    }
  }
  handleDistanciaChange = (i, j, event) => {
    //para obtener las distancias
    const valor = parseInt(event.target.value, 10);
    console.log("distancia change");
    this.validarDiagonal(valor,i,j);
    
    console.log(this.state.distancias);
    
}

  render() {
    const numNodos = this.state.numNodos;
    const matrizDistancias = [];
    
    for (let i = 0; i < numNodos; i++) {
        const fila = [];
        for (let j = 0; j < numNodos; j++) {
            fila.push(
                <input
                    name={`celda-${i}-${j}`}
                    key={`celda-${i}-${j}`}
                    type="number"
                    defaultValue={this.state.distancias[i * numNodos + j] }
                    //value={this.state.distancias[i * numNodos + j] }
                    onChange={(e) => this.handleDistanciaChange(i, j, e)}
                />            
            );
        }
        
        matrizDistancias.push(<div name={`fila-${i}`} key={`fila-${i}`} className="fila">{fila}</div>);        
      } 

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Número de nodos:</label>
          <input
              type="number"
              onChange={this.handleNumNodosChange}
            />
          {matrizDistancias}
          <button type="submit">Calcular</button>
        </form>
        
      </div>
      
    );
  }
}

export default Matriz;

