import React, {useEffect, useState} from "react";
import { Footer } from "./Footer";
import { Sidebar} from "./Sidebar";
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { NavbarInner } from "./NavbarInner";
import { VerifyAdmin, VerifyToken } from "../Authguard";
// import { useNavigate } from "react-router-dom";

const ReportComplain = () => {
  // let navigate = useNavigate();
  const [ data, setData ] = useState([]);
  useEffect(()=> {
    VerifyToken();
    VerifyAdmin();
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
      const res = await axios.get("http://localhost:5000/api/complain", "", config);
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
        <NavbarInner title="Report-Complain " />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body">
              <table className="table table-responsive-sm" id="report">
                <thead className="table-primary">
                  <tr>
                  <th scope="col">User</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Brand</th>
                    <th scope="col">ModelName</th>
                    <th scope="col">ModelNumber</th>
                    {/* <th scope="col">status</th> */}
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row._id}>
                    <td>{row.userdetails[0].name}</td>
                    <td>{row.title}</td>
                    <td>{row.desc}</td>
                    <td>{row.brand}</td>
                    <td>{row.modelname}</td>
                    <td>{row.modelno}</td>
                    {/* <td><button className="btn btn-sm rstatus">{row.status}</button></td> */}
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

export default ReportComplain;