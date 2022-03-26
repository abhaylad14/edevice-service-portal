import React, { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { NavbarInner } from './NavbarInner'
import { Sidebar } from './Sidebar'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const Feedbacks = () => {
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
      const res = await axios.get("http://localhost:5000/api/feedback", "", config);
      if(res.data.status === true){
        console.log(res.data.feedbacks);
        setData(res.data.feedbacks);
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
      const request = { "id": id };
      const res = await axios.post("http://localhost:5000/api/feedback/deletefeedback", request, config);
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
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row._id}>
                    <td>{row.title}</td>
                    <td>{row.desc}</td>
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
  )
}

export default Feedbacks;