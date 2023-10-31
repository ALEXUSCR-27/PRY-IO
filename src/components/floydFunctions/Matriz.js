
import React, { Component } from 'react';
import '../../styles/FloydMatriz.css'
import RutaOptima from './rutaOptima';

class Matriz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numNodos: 0,
      distancias: [],
      iteracion: 0,
      distanciasMatriz: [],
      matrizP: [],

      //para las rutas optimas
      mostrarRutaOptima: false,
    };
    
  }


  CalculateFloyd = () => {
    
    const matrix = [...this.state.distanciasMatriz];
    const matrixp = [...this.state.matrizP];
    const dimension = this.state.numNodos; 
    
    let nodoActual = this.state.iteracion-1;//se resta 1 porque el array empieza en 0
    let valorAnterior = 0;
    // Algoritmo de Floyd
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            valorAnterior = matrix[i][j];  
            matrix[i][j] = Math.min(matrix[i][j], matrix[i][nodoActual] + matrix[nodoActual][j]);
            if(matrix[i][j] != valorAnterior){
              matrixp[i][j] = nodoActual+1;
            }            

        }             
    }
    this.setState({ distanciasMatriz: matrix });
    this.setState({ matrizP: matrixp });
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
      this.setState({ distanciasMatriz: matrix });
      
      //creacion de la matriz P
      this.state.matrizP = new Array(this.state.distanciasMatriz.length).fill([]).map(() => new Array(this.state.distanciasMatriz.length).fill(0));  

      //se muestra la matriz D(0)
      console.log("Resultado de la iteración #0");
      //console.log("Matriz: \n", this.state.distanciasMatriz);
      this.showMatriz();
    }else{
      if (this.state.iteracion > this.state.numNodos){
        //se llego a la solucion optima
        window.alert("Ya se ha llegado a la solución óptima \n Scroll down para solicitar rutas óptimas.");
        console.log("Solución óptima: \n");
        this.showMatriz();
        this.setState({ mostrarRutaOptima: true });
        return;
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
      <div className='floydmainDiv'>
        <form className='floydform1' onSubmit={this.handleSubmit}>
          <label>Número de nodos:</label>
          <input
              type="number"
              onChange={this.handleNumNodosChange}
            />
          {matrizDistancias}
          <button className='floydcalcularbtn' type="submit">Calcular</button>
        </form>
        
        <div className='floydtabladdiv'>
        {this.state.distanciasMatriz.length > 0 && (
          <div>
            <h2 className='h2tablaD'>{`Tabla D(${this.state.iteracion-1})`}</h2>
            <table className='floydtablad'>
              <thead className='theadtablad'>
                <tr className='trtablad'>
                  <th className='thtablad'>Nodo</th>
                  {Array.from({ length: this.state.distanciasMatriz.length}, (_, i) => (
                    <th className='thtablad' key={i}>{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody className='tbodytablad'>
                {this.state.distanciasMatriz.map((row, rowIndex) => (
                  <tr className='trtablad' key={rowIndex}>
                    <td className='tdtablad'>{`Nodo ${rowIndex+1}`}</td>
                    {row.map((cell, cellIndex) => (
                      <td className='tdtablad' key={cellIndex} style={{ backgroundColor: cell ? "green" : "red" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
        <div>
        {this.state.matrizP.length > 0 && (
          <div className='divtablap'>
            <h2 className='h2tablap'>{`Tabla P(${this.state.iteracion-1})`}</h2>
            <table className='tablatablap'>
              <thead className='theadtablap'>
                <tr className='trtablap'>
                  <th className='thtablap'>Nodo</th>
                  {Array.from({ length: this.state.matrizP.length}, (_, i) => (
                    <th className='thtablap' key={i}>{i+1}</th>
                  ))}
                </tr>
              </thead>
              <tbody className='tbodytablap'>
                {this.state.matrizP.map((row, rowIndex) => (
                  <tr className='trtablap' key={rowIndex}>
                    <td className='tdtablap'>{`Nodo ${rowIndex+1}`}</td>
                    {row.map((cell, cellIndex) => (
                      <td className='tdtablap' key={cellIndex} style={{ backgroundColor: cell ? "green" : "red" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
        <div>        
        {this.state.mostrarRutaOptima && (
          <RutaOptima matrizP={this.state.matrizP} />
        )}
      </div>

      </div>
      
    );
  }
}

export default Matriz;

