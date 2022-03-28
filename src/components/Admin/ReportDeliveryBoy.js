import React, {useEffect, useState} from "react";
import { Footer } from "./Footer";
import { Sidebar} from "./Sidebar";
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { NavbarInner } from "./NavbarInner";

const ReportDeliveryBoy = () => {
  const [ data, setData ] = useState([]);
  useEffect(()=> {
    getData();
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
      const res = await axios.get("http://localhost:5000/api/users/getdeliveryboys", "", config);
      if(res.data.status === true){
        console.log(res.data.data);
        setData(res.data.data);
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
        <NavbarInner title="Report-DeliveryBoy " />
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
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Address</th>
                    {/* <th scope="col">status</th> */}
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row._id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.pincode}</td>
                    <td>{row.address}</td>
                    {/* <td><button className="btn btn-sm userstatus">{row.status}</button></td> */}
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

export default ReportDeliveryBoy;