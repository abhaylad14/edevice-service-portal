import React, { useEffect, useState } from 'react'
import { Footer } from '../Footer';
import { NavbarInner } from './NavbarInner';
import { Sidebar } from './Sidebar';
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const Requests = () => {
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
        <NavbarInner title="Requests" />
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
                    <th scope="col">Brand</th>
                    <th scope="col">Model Name</th>
                    <th scope="col">Model No.</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
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
                    <td className='rstatus badge mt-1'>{row.status}</td>
                    <td>
                    <button name={row._id} className="btn btn-outline-info btn-sm fas fa-eye border-0 btn-view"> View</button>
                    <button name={row._id} className="btn btn-outline-success btn-sm fas fa-check border-0 btn-accept"> Accept</button>
                    <button name={row._id} className="btn btn-outline-danger btn-sm fas fa-times border-0 btn-reject"> Reject</button>
                    </td>
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

export default Requests