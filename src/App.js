
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './components/MainPage';
import Ejem from './components/Ejem';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path = "/" element = {<MainPage/>}/>
            <Route exact path = "/floyd" element = {<Ejem/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
