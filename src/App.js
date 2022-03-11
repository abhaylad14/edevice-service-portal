import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './components/Home';
import Registration  from './components/Registration';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/registration' element={<Registration />}/>
        </>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
