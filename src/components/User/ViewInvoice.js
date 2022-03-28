import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const ViewInvoice = () => {
    const [ data, setData ] = useState([]);
  useEffect(()=> {
    getData();
  },[]);
  const getData = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
      try{
        const config = {
          header:{
            "Content-Type": "application/json",
          }
        }
        let reqdata = { id };
        let token = await localStorage.getItem("x-auth-token");
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.post("http://localhost:5000/api/complain/getone", reqdata, config);
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
  return (
    <>
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Invoice" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body col-sm-6 mx-auto">
                <table className="table table-responsive-sm" id="invoice">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="text-center" colSpan="2">Invoice</th><th></th>
                    </tr>
                  </thead>
                  {/* <thead>
                    <tr><th scope="col"></th><th scope="col"></th></tr>
                  </thead> */}
                    {data.map(row => (
                      <tbody key={row._id}>
                      <tr><td>Name: </td><td>{row.userdetails[0].name}</td></tr>
                      <tr><td>Email: </td><td>{row.userdetails[0].email}</td></tr>
                      <tr><td>Mobile: </td><td>{row.userdetails[0].mobile}</td></tr>
                      <tr><td>Pin code: </td><td>{row.userdetails[0].pincode}</td></tr>
                      <tr><td>Address: </td><td>{row.userdetails[0].address}</td></tr>
                      <tr><td colSpan="2" className="text-center"><strong>Service Details</strong></td><td></td></tr>
                      <tr><td>Title: </td><td>{row.title}</td></tr>
                      <tr><td>Description: </td><td>{row.desc}</td></tr>
                      <tr><td>Brand: </td><td>{row.brand}</td></tr>
                      <tr><td>Model Name: </td><td>{row.modelname}</td></tr>
                      <tr><td>Model No: </td><td>{row.modelno}</td></tr>
                      <tr><td colSpan="2" className="text-center"><strong>Service charges</strong></td><td></td></tr>
                      {Object.entries(row.chklist).map(([k,v]) => (<tr key={k}><td><strong className='mr-2'>{k}: </strong></td><td>{v}</td></tr>))}
                      <tr><td className="h4">Total charges: </td><td className="h4"> ₹ {row.estimate}</td></tr>
                      </tbody>
                    ))}
                </table>
                <div class="text-center mt-3">
                  <button id="downloadpdf" class="btn btn-primary">Download Invoice</button>
                </div>
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

export default ViewInvoice