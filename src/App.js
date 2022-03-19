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
import VerifyAccount from './components/VerifyAccount';
import UserDashboard from './components/User/Dashboard';
import AdminDashboard from './components/Admin/Dashboard';
import AdminUsers from './components/Admin/Users';
import DeliveryboyDashboard from './components/Deliveryboy/Dashboard';
import ServicemanDashboard from './components/Serviceman/Dashboard';
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
        <Route exact path='/verifyaccount' element={<VerifyAccount />}/>

        {/* Admin */}
        <Route exact path='/admin/dashboard' element={<AdminDashboard />}/>
        <Route exact path='/admin/users' element={<AdminUsers />}/>


        {/* Users */}
        <Route exact path='/user/dashboard' element={<UserDashboard />}/>
        
        {/* Deliveryboy */}
        <Route exact path='/deliveryboy/dashboard' element={<DeliveryboyDashboard />}/>

        {/* Serviceman */}
        <Route exact path='/serviceman/dashboard' element={<ServicemanDashboard />}/>
        

    </Routes>
    </>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
