
import React, {useState} from 'react';
import '../../styles/FloydMatriz.css'

function RutaOptima({matrizP}) {

    const [nodoInicio,setnodoInicio] = useState(0);
    const [nodoFinal,setnodoFinal] = useState(0);
    const [rutaOptima, setRutaOptima] = useState("");

    const handleNodoInicioChange = (event) => {
        console.log("Nodo inicio",event.target.value);
        setnodoInicio(event.target.value);
    }

    const handleNodoFinalChange = (event) => {
        console.log("Nodo Final",event.target.value);
        setnodoFinal(event.target.value);
    }

    const findOptimalRoute = (event) => {
        console.log("Busqueda de la ruta óptima en: ", matrizP);
        const nodoInicioInt = parseInt(nodoInicio,10)-1;
        const nodoFinalInt = parseInt(nodoFinal,10)-1;
        let nodoActual = matrizP[nodoInicioInt][nodoFinalInt];
        let rutaOptimaArray = [];
        let rutas = "v"+nodoInicio+" -> ";
        if(nodoActual == 0){
            rutas = "Ruta directa: "+rutas;
            rutas += " v"+nodoFinal;
        }else{
            while(nodoActual != 0){  
                rutaOptimaArray.push(nodoActual);              
                nodoActual = matrizP[nodoActual-1][nodoFinalInt];
            }
            for(let i = 0; i <= rutaOptimaArray.length-1; i++){
                rutas += "v"+rutaOptimaArray[i]+" -> ";
            }
            rutas += "v"+nodoFinal;
        }
        //console.log("Ruta óptima: ",rutaOptimaArray);
        console.log("Ruta óptima: ",rutas);
        setRutaOptima(rutas);
        
    }

    return (
        <div className='divRutaOptima'>
            <main className='mainRutaOptima'>
                <div className='divcontenedorrutaoptima'>
                    {/* Sección para solicitar la ruta óptima */}
                    <h2 className='h2rutaoptima'>Solicitar Ruta Óptima</h2>
                    <form className='formrutaoptima' onSubmit={(e) => { e.preventDefault(); findOptimalRoute(); }}>
                        <label className='labelrutaoptima'>Nodo de inicio:</label>
                        <input className='inputrutaoptima'
                        type="number"
                        value={nodoInicio}
                        onChange={handleNodoInicioChange}
                        />
                        <label className='labelrutaoptima'>Nodo final:</label>
                        <input className='inputrutaoptima'
                        type="number"
                        value={nodoFinal}
                        onChange={handleNodoFinalChange}
                        />
                        <button className='btnrutaoptima' type="submit">Encontrar Ruta Óptima</button>
                    </form>
                </div>                      
                <div>
                        <h3 className='h3rutaoptima'>Ruta Óptima:</h3>
                        <p className='prutaoptima'>{rutaOptima}</p>
                </div>
            </main>
        </div>
    );
}

export default RutaOptima;



