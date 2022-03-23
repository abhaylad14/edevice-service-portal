import React, {useEffect, useState} from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavbarInner } from "./NavbarInner";
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const Users = () => {
   const [ data, setData ] = useState([]);
  
  useEffect(()=> {
    getData();
  },[]);
  const getData = async() => {
    try{
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const config = {
        header:{
          "Content-Type": "application/json",
          "x-auth-token": token
        }
        // x-auth-token: {"x-auth-token": token}
      }
      const res = await axios.get("http://localhost:5000/api/users/getcustomers", "",config);
      // axios.defaults.headers.common['x-auth-token'] = `Bearer ${localStorage.getItem("x-auth-token")}` 
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

  const handleDelete = async(e) => {
    console.log(e.target.name);
  }
  return (
    <>
      <Header />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavbarInner title="Customers" />
        <div className="container-fluid py-4">
          <div className="card">
            <div className="card-body">
              <table className="table table-responsive-sm" id="myTable">
                <thead className="table-info">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row}>
                    <td><img src={row.avatar} className="avatar avatar-sm me-3 border-radius-lg" /></td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td className="badge mt-2 userstatus">{row.status}</td>
                    <td>
                    <button onClick={e => handleDelete(e)} name={row._id} className="btn btn-outline-danger btn-sm fas fa-trash-alt border-0 btn-delete"></button>
                    </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Users;
