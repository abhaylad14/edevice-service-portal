import React, { useEffect, useState } from 'react'
import { Footer } from '../Footer';
import { NavbarInner } from './NavbarInner';
import { Sidebar } from './Sidebar';
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { VerifyAdmin, VerifyToken } from '../Authguard';

const AssignRequest = () => {
    const [ smen, setSmen ] = useState([]);
    const [ dboys, setDboys ] = useState([]);
    const [ data, setData ] = useState([]);
  useEffect(()=> {
    VerifyToken();
    VerifyAdmin();
    getData();
    getserviceman();
    getdeliveryboys();
  },[]);
  const getData = async() => {
    try{
      const config = {
        header:{
          "Content-Type": "application/json",
        }
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get("http://localhost:5000/api/complain/accepted", "", config);
      if(res.data.status === true){
        console.log(res.data.complains);
        setData(res.data.complains);
        const script = document.createElement("script");
            script.src = `${process.env.PUBLIC_URL}/DataTables.js`;
            script.async = true;
            document.body.appendChild(script);
      }
      else{
          console.log(res.data);
          alertify.error("Error: Something went wrong!");
      }
    }
    catch(err){
      alertify.error("Something went wrong!");
    }
  } 
  const getserviceman = async() => {
    try{
      const config = {
        header:{
          "Content-Type": "application/json",
        }
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get("http://localhost:5000/api/users/serviceman", "", config);
      if(res.data.status === true){
        console.log(res.data.data);
        setSmen(res.data.data);
      }
      else{
          console.log(res.data);
          alertify.error("Error: Something went wrong!");
      }
    }
    catch(err){
      alertify.error("Something went wrong!");
    }
  } 
  const getdeliveryboys = async() => {
    try{
      const config = {
        header:{
          "Content-Type": "application/json",
        }
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get("http://localhost:5000/api/users/deliveryboys", "", config);
      if(res.data.status === true){
        console.log(res.data.data);
        setDboys(res.data.data);
      }
      else{
          console.log(res.data);
          alertify.error("Error: Something went wrong!");
      }
    }
    catch(err){
      alertify.error("Something went wrong!");
    }
  } 
  const handleAssignSman = async(e) => {
    let sid = e.target.value;
    let cid = e.target.id;
    try {
        const config = {
            header:{
              "Content-Type": "application/json",
            }
          }
          let token = await localStorage.getItem("x-auth-token");
          axios.defaults.headers.common["x-auth-token"] = token;
          const complain = { cid,sid }
          const res = await axios.post("http://localhost:5000/api/complain/assignserviceman", complain, config);
          if(res.data.status === true){
            alertify.success(res.data.msg)
            getData();
          }
          else{
              console.log(res.data);
              alertify.error("Error: Something went wrong!");
          }
    } catch (err) {
        console.log(err);
        alertify.error("Something went wrong!");
    }
  }
  const handleAssignPickupboy = async(e) => {
    let pid = e.target.value;
    let cid = e.target.id;
    try {
        const config = {
            header:{
              "Content-Type": "application/json",
            }
          }
          let token = await localStorage.getItem("x-auth-token");
          axios.defaults.headers.common["x-auth-token"] = token;
          const complain = { cid,pid }
          const res = await axios.post("http://localhost:5000/api/complain/assignpickup", complain, config);
          if(res.data.status === true){
            alertify.success(res.data.msg)
            getData();
          }
          else{
              console.log(res.data);
              alertify.error("Error: Something went wrong!");
          }
    } catch (err) {
        console.log(err);
        alertify.error("Something went wrong!");
    }
  }
  const handleAssignDeliveryboy = async(e) => {
    let did = e.target.value;
    let cid = e.target.id;
    try {
        const config = {
            header:{
              "Content-Type": "application/json",
            }
          }
          let token = await localStorage.getItem("x-auth-token");
          axios.defaults.headers.common["x-auth-token"] = token;
          const complain = { cid, did }
          const res = await axios.post("http://localhost:5000/api/complain/assigndelivery", complain, config);
          if(res.data.status === true){
            alertify.success(res.data.msg)
            getData();
          }
          else{
              console.log(res.data);
              alertify.error("Error: Something went wrong!");
          }
    } catch (err) {
        console.log(err);
        alertify.error("Something went wrong!");
    }
  }
  return (
    <>
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Assign Request" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body">
              <table className="table table-responsive-sm" id="myTable">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Model Name</th>
                    <th scope="col">Model No.</th>
                    <th scope="col">Service Man</th>
                    <th scope="col">Pickup Boy</th>
                    <th scope="col">Delivery Boy</th>
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row._id}>
                    <td>{row.userdetails[0].name}</td>
                    <td>{row.title}</td>
                    <td>{row.brand}</td>
                    <td>{row.modelname}</td>
                    <td>{row.modelno}</td>
                    <td><select id={row._id} value={row.serviceman !== undefined ? row.serviceman : ""} onChange={e => handleAssignSman(e)} className='form-control' name='sid'> 
                    <option value="" disabled>--- Select ---</option>
                    {smen.map(x => (<option key={x._id} value={x._id}>{x.name}</option>))}
                      </select></td>
                      <td><select id={row._id} value={row.pickupuser !== undefined ? row.pickupuser : ""} onChange={e => handleAssignPickupboy(e)} className='form-control' name='sid'> 
                    <option value="" disabled>--- Select ---</option>
                    {dboys.map(x => (<option key={x._id} value={x._id}>{x.name}</option>))}
                      </select></td>
                      <td><select id={row._id} value={row.deliveryuser !== undefined ? row.deliveryuser : ""} onChange={e => handleAssignDeliveryboy(e)} className='form-control' name='sid'> 
                    <option value="" disabled>--- Select ---</option>
                    {dboys.map(x => (<option key={x._id} value={x._id}>{x.name}</option>))}
                      </select></td>
                    </tr>
                    ))}
                </tbody>
              </table>
              </div>
            </div>
            {/* Content End */}
          </div>
          <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignRequest