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
import Customers from './components/Admin/Customers';
import DeliveryBoys from './components/Admin/Deliveryboys';
import Servicemen from './components/Admin/Servicemen';
import DeliveryboyDashboard from './components/Deliveryboy/Dashboard';
import ServicemanDashboard from './components/Serviceman/Dashboard';
import UserRequests from './components/User/Request';
import AddRequest from './components/User/AddRequest';
import Brands from './components/Admin/Brands'; 
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Requests from './components/Admin/Requests';
import AssignRequest from './components/Admin/AssignRequest';
import Feedbacks from './components/Admin/Feedbacks';
import Feedback from './components/User/Feedback';

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
        <Route exact path='/forgotpassword' element={<ForgotPassword />}/>
        <Route exact path='/resetpassword' element={<ResetPassword />}/>

        {/* Admin */}
        <Route exact path='/admin/dashboard' element={<AdminDashboard />}/>
        <Route exact path='/admin/customers' element={<Customers />}/>
        <Route exact path='/admin/deliveryboys' element={<DeliveryBoys />}/>
        <Route exact path='/admin/servicemen' element={<Servicemen />}/>
        <Route exact path='/admin/brands' element={<Brands />}/>
        <Route exact path='/admin/requests' element={<Requests />}/>
        <Route exact path='/admin/assignrequest' element={<AssignRequest />}/>
        <Route exact path='/admin/feedbacks' element={<Feedbacks />}/>

        {/* Users */}
        <Route exact path='/user/dashboard' element={<UserDashboard />}/>
        <Route exact path='/user/requests' element={<UserRequests />}/>
        <Route exact path='/user/addrequest' element={<AddRequest />}/>
        <Route exact path='/user/feedback' element={<Feedback />}/>

        
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
