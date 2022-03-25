import React, {useEffect, useState} from "react";
import { Footer } from "./Footer";
import { Sidebar} from "./Sidebar";
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { NavbarInner } from "./NavbarInner";

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
        }
      }
      const res = await axios.get("http://localhost:5000/api/users/getcustomers", "", config);
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
    let id = e.target.name;
    console.log(id);
    try{
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const user = { "id": id };
      console.log(user)
      const res = await axios.post("http://localhost:5000/api/users/deleteuser", user, config);
      if(res.data.status === true){
        alertify.success(res.data.msg);
        let newdata = data.filter(row => (row._id !== id ));
        setData(newdata)
      }
      else{
        alertify.error("Something went wrong!");
      }
    }
    catch(err){
      alertify.error(err.response.data['errors'][0].msg);
    }
  }
  const handleStatusChange = async(e) => {
    let id = e.target.name;
    console.log(id);
    try{
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      }
      let url = "";
      if(e.target.id === "1"){
        url = "http://localhost:5000/api/users/deactivate";
      }
      else if(e.target.id === "0"){
        url = "http://localhost:5000/api/users/activate";
      }
      else{
        return true;
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const user = { "id": id };
      console.log(user)
      const res = await axios.post(url, user, config);
      if(res.data.status === true){
        if(e.target.id === "1"){
          e.target.className = "btn btn-sm btn-danger mt-1 userstatus";
          e.target.innerText = "Inactive";
          e.target.id = 0;
        }
        else if(e.target.id === "0"){
          e.target.className = "btn btn-sm btn-success mt-1 userstatus";
          e.target.innerText = "Active";
          e.target.id = 1;
        }
        alertify.success(res.data.msg);
        console.log(res)
      }
      else{
        alertify.error("Something went wrong!");
      }
    }
    catch(err){
      console.log(err)
      alertify.error(err.response.data['errors'][0].msg);
    }
  }
  return (
    <>
     <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Customers" />
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
                      <tr key={row._id}>
                    <td><img src={row.avatar} alt="error" height={30} /></td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td><button onClick={e => handleStatusChange(e)} id={row.status} name={row._id} className="btn btn-sm userstatus">{row.status}</button></td>
                    <td>
                    <button onClick={e => handleDelete(e)} name={row._id} className="btn btn-outline-danger btn-sm fas fa-trash-alt border-0 btn-delete"></button>
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
  );
};

export default Users;
