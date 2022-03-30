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
import AddEmployee from './components/Admin/AddEmployee';
import PickupRequests from './components/Deliveryboy/PickupRequests';
import ServiceRequests from './components/Serviceman/ServiceRequests';
import SetEstimate from './components/Serviceman/SetEstimate';
import DeliveryRequests from './components/Deliveryboy/DeliveryRequests';
import ReportComplain from './components/Admin/ReportComplain'
import ReportCustomer from './components/Admin/ReportCustomer'
import ReportDeliveryBoy from './components/Admin/ReportDeliveryBoy'
import ReportServiceman from './components/Admin/ReportServiceman'
import UserProfile from './components/User/Profile';
import ServicemanProfile from './components/Serviceman/Profile';
import DeliverymanProfile from './components/Deliveryboy/Profile';
import ViewBills from './components/Admin/ViewBills';
import ViewInvoice from './components/Admin/ViewInvoice';
import ViewUserInvoice from './components/User/ViewInvoice';


import UserState from "./context/user/UserState"

const App = () => {
  return (
    <Provider store={store}>
      <UserState>
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
        <Route exact path='/admin/addemployee' element={<AddEmployee />}/>
        <Route exact path='/admin/complainreport' element={<ReportComplain />}/>
        <Route exact path='/admin/customerreport' element={<ReportCustomer />} />
        <Route exact path='/admin/deliveryboyreport' element={<ReportDeliveryBoy />} />
        <Route exact path='/admin/servicemanreport' element={<ReportServiceman />} />
        <Route exact path='/admin/viewbills' element={<ViewBills />} />
        <Route exact path='/admin/invoice' element={<ViewInvoice />} />

        {/* Users */}
        <Route exact path='/user/dashboard' element={<UserDashboard />}/>
        <Route exact path='/user/requests' element={<UserRequests />}/>
        <Route exact path='/user/addrequest' element={<AddRequest />}/>
        <Route exact path='/user/feedback' element={<Feedback />}/>
        <Route exact path='/user/profile' element={<UserProfile />}/>
        <Route exact path='/user/invoice' element={<ViewUserInvoice />}/>

        
        {/* Deliveryboy */}
        <Route exact path='/deliveryboy/dashboard' element={<DeliveryboyDashboard />}/>
        <Route exact path='/deliveryboy/pickuprequests' element={<PickupRequests />}/>
        <Route exact path='/deliveryboy/deliveryrequests' element={<DeliveryRequests />}/>
        <Route exact path='/deliveryboy/profile' element={<DeliverymanProfile />}/>

        {/* Serviceman */}
        <Route exact path='/serviceman/dashboard' element={<ServicemanDashboard />}/>
        <Route exact path='/serviceman/servicerequests' element={<ServiceRequests />}/>
        <Route exact path='/serviceman/setestimate' element={<SetEstimate />}/>
        <Route exact path='/serviceman/profile' element={<ServicemanProfile />}/>
        

    </Routes>
    </>
    </BrowserRouter>
    </UserState>
    </Provider>
  );
}

export default App;
