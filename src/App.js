import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Registration  from './components/Registration';
import Login from './components/Login';
import Alert from './components/Alert';

// Redux 
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <>
    <Alert />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/registration' element={<Registration />}/>
        <Route exact path='/login' element={<Login />}/>
        
    </Routes>
    </>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
