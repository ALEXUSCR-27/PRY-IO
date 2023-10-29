import React, { useState } from "react";
import NavBar from "./NavBar";

function defineCopies(pproblemType) {
    if (pproblemType === "0-1") {
        return 1;
    }else if (pproblemType === "unbounded") {
        return Infinity;
    }else{   
        return 0;
    }
}
function Backpack() {
    const [capacity, setCapacity] = useState(0);
    const [problemType, setProblemType] = useState("0-1");  
    const [items, setItems] = useState([{name: "", value: 0, weight: 0, copies: defineCopies(problemType) }]);
    const [table, setTable] = useState([]);
  const addItem = () => {
    setItems([...items, { value: 0, weight: 0, copies: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleCapacityChange = (e) => {
    setCapacity(parseInt(e.target.value, 10));
  };

  const handleItemValueChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].value = parseInt(e.target.value, 10);
    setItems(updatedItems);
  };

  const handleItemWeightChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].weight = parseInt(e.target.value, 10);
    setItems(updatedItems);
  };

  const handleItemCopiesChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].copies = parseInt(e.target.value, 10);
    setItems(updatedItems);
  };




  const solveKnapsack = () => {
    console.log("Tipo de problema", problemType);
    console.log("Capacidad de la Mochila", capacity);
    console.log("Cantidad de objetos", items);

    // Resto de la lógica para resolver el problema de la mochila

    //para definir las copias de los objetos
    if (defineCopies(problemType) != 0) {
        
        items.forEach((item) => {
            item.copies = defineCopies(problemType);
        });
    }
    let num = 1;
    items.forEach((item, index) => {
        const valor = item.value;
        const peso = item.weight;
        const copias = item.copies;        
        item.name = "Objeto " + num;
        console.log(`Objeto ${index + 1}: Valor = ${valor}, Peso = ${peso}, Copias = ${copias}`);        
        num++;
      });
    
    
      if (problemType === "0-1") {
        // algoritmo de la mochila 0-1
        console.log("Resolviendo Knapsack 0/1");
        // Calcular la tabla de programación dinámica
        const n = items.length;
        const dp = new Array(n + 1).fill([]).map(() => new Array(capacity + 1).fill(0));

        for (let i = 1; i <= n; i++) {
          for (let w = 0; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
              dp[i][w] = Math.max(
                dp[i - 1][w],
                dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
              );
            } else {
              dp[i][w] = dp[i - 1][w];
            }
          }
        }

        setTable(dp);

        

        //Calcular la solución final y mostrar los objetos incluidos
        const includedItems = [];
        let w = capacity;

        for (let i = n; i > 0 && w > 0; i--) {
          if (dp[i][w] !== dp[i - 1][w]) {
            includedItems.push(items[i - 1]);
            //console.log("Objeto incluido:",items[i-1].name," con los valores",items[i-1]);
            w -= items[i - 1].weight;
          }
        }
        console.log("Solución final: ", includedItems);
        includedItems.forEach((item) => {
          console.log(`Se agregó el Objeto "${item.name}" con el Valor = ${item.value}, y con Peso = ${item.weight}`);
        });
        

    } else if (problemType === "bounded") {
        // algoritmo de la mochila bounded
        console.log("Resolviendo Knapsack Bounded");
        const n = items.length;
        const dp = new Array(n + 1).fill([]).map(() => new Array(capacity + 1).fill(0));

        for (let i = 0; i <= n; i++) {
          for (let j = 0; j <= capacity; j++) {
            if (i === 0 || j === 0) {
              dp[i][j] = 0;
            } else {
              dp[i][j] = dp[i - 1][j];
              for (let k = 1; k <= items[i - 1].copies; k++) {
                if (items[i - 1].weight * k <= j) {
                  dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i - 1][j - items[i - 1].weight * k] + items[i - 1].value * k
                  );
                }else{
                  break;
                }
              }
            } 
          }
        }

        setTable(dp);

        console.log("Valor máximo obtenido:", dp[n][capacity]);

    } else if (problemType === "unbounded") {   
        // algoritmo de la mochila unbounded
        console.log("Resolviendo Knapsack Unbounded");
        const n = items.length;
        const dp = new Array(n + 1).fill([]).map(() => new Array(capacity + 1).fill(0));

        // Crear una matriz para realizar un seguimiento de los elementos seleccionados.
        //let selectedItems = new Array(n + 1).fill(0);

        for (let i = 0; i <= n; i++) {
          for (let j = 0; j <= capacity; j++) {
            if (i === 0 || j === 0) {
              dp[i][j] = 0;
            } else if (items[i-1].weight <= j) {
                //dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - items[i-1].weight] + items[i-1].value);
                if (dp[i - 1][j] > dp[i][j - items[i-1].weight] + items[i-1].value) {
                  dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i][j - items[i-1].weight] + items[i-1].value;
                    //selectedItems[i] = selectedItems[i] + 1; // Incrementar la cantidad de copias seleccionadas.
                }
            } else {
                dp[i][j] = dp[i - 1][j];
            }     
            }
        }

        setTable(dp);

        console.log("Valor máximo obtenido:", dp[n][capacity]);

        /*
        // Obtener los objetos seleccionados en la solución final.
        let objectsSelected = [];
        for (let i = 1; i <= n; i++) {
            if (selectedItems[i] > 0) {
                objectsSelected.push(`Objeto ${i}: ${selectedItems[i]} copia(s)`);
            }
        }

        // Mostrar los objetos seleccionados.
        console.log("Objetos seleccionados:");
        for (let obj of objectsSelected) {
            console.log(obj);
        }
        */
  
    } else {
        console.log("Error, no se ha seleccionado un tipo de problema");
    }

  };


  const handleProblemTypeChange = (e) => {
    console.log("Tipo de problema", e.target.value);
    setProblemType(e.target.value);
    const copias = defineCopies(e.target.value);
    if (copias === 0) {    
        window.alert("Se ha escogido el tipo de problema de bounded, por lo que debe especificar la cantidad de cada objeto");
    }else if (copias === 1) {
        window.alert("Se ha escogido el tipo de problema de 0-1, por lo que solo se tendrá 1 copia de cada objeto");
    }else{
        window.alert("Se ha escogido el tipo de problema de unbounded, por lo que se tendrán infinitas copias de cada objeto");
    }
    items.forEach((item) => {
        item.copies = defineCopies(problemType);
    });
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>El Problema de la Mochila</h1>
        <div>
          <label>Capacidad Máxima de la Mochila:</label>
          <input
            type="number"
            value={capacity}
            onChange={handleCapacityChange}
          />
        <button onClick={addItem}>Agregar Objeto</button>
        </div>
        {items.map((item, index) => (
          <div key={index}>
            <h5>Objeto {index + 1}, ingrese valor y peso (si el tipo de problema es bounded, se indica la cantidad):</h5>
            <input
              type="number"
              placeholder="Valor"
              value={item.value}
              onChange={(e) => handleItemValueChange(index, e)}
            />
            <input
              type="number"
              placeholder="Peso"
              value={item.weight}
              onChange={(e) => handleItemWeightChange(index, e)}
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={item.copies}
              onChange={(e) => handleItemCopiesChange(index, e)}
            />
            <button onClick={() => removeItem(index)}>Eliminar Objeto</button>
          </div>
        ))}
        <div>
          <label>Tipo de Problema:</label>
          <select
            value={problemType}
            onChange={(e) => handleProblemTypeChange(e)}
          >
            <option value="0-1">0/1</option>
            <option value="bounded">Bounded</option>
            <option value="unbounded">Unbounded</option>
          </select>
        </div>
        <div>
          <button onClick={solveKnapsack}>Resolver</button>
        </div>
        {table.length > 0 && (
          <div>
            <h2>Tabla de Programación Dinámica</h2>
            <table>
              <thead>
                <tr>
                  <th>Objeto</th>
                  {Array.from({ length: capacity + 1 }, (_, i) => (
                    <th key={i}>{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{`Objeto ${rowIndex}`}</td>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ backgroundColor: cell ? "green" : "red" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )};
      </main>
    </div>
  );
}

export default Backpack;
