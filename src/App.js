
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './components/MainPage';

import Floyd from './components/Floyd';
import Backpack from './components/Backpack';
import Replacement from './components/Replacement';
import OptimalSearch from './components/OptimalSearch';
import SportSeries from './components/SportSeries';
import MatrixMul from './components/MatrixMul';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path = "/" element = {<MainPage/>}/>
            <Route exact path = "/FloydAlgorithm" element = {<Floyd/>}/>
            <Route exact path = "/BKAlgorithm" element = {<Backpack/>}/>
            <Route exact path = "/ReplacementAlgorithm" element = {<Replacement/>}/>
            <Route exact path = "/OptimalSearchAlgorithm" element = {<OptimalSearch/>}/>
            <Route exact path = "/SportSeriesAlgorithm" element = {<SportSeries/>}/>
            <Route exact path = "/MatrixMulAlgorithm" element = {<MatrixMul/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
