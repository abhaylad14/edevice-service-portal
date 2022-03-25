import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";
import { Sidebar } from "./Sidebar";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";

const Brands = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { name } = formData;
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
      const res = await axios.get("http://localhost:5000/api/brands/", "",config);
      if(res.data.status === true){
        console.log(res.data.brands);
        setData(res.data.brands);
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
        console.log(err)
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
      const brand = { "id": id };
      const res = await axios.post("http://localhost:5000/api/brands/deletebrand", brand, config);
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
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
    };
    setFormData({ name: "" });
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.post(
        "http://localhost:5000/api/brands/addbrand",
        data,
        config
      );
      if (res.data.status === true) {
        getData();
        alertify.success(res.data.msg);
      } else {
        alertify.error("Somthing went wrong!");
      }
    } catch (err) {
      alertify.error(err.response.data["errors"][0].msg);
    }
  };
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
        url = "http://localhost:5000/api/brands/deactivate";
      }
      else if(e.target.id === "0"){
        url = "http://localhost:5000/api/brands/activate";
      }
      else{
        return true;
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const brand = { "id": id };
      console.log(brand)
      const res = await axios.post(url, brand, config);
      if(res.data.status === true){
        if(e.target.id === "1"){
          e.target.className = "btn btn-sm btn-danger userstatus";
          e.target.innerText = "Inactive";
          e.target.id = 0;
        }
        else if(e.target.id === "0"){
          e.target.className = "btn btn-sm btn-success userstatus";
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
  const handleEdit = (e) => {
      let id = e.target.name;
      let brand = e.target.parentElement.parentElement.children[0].innerText
      document.getElementById("editbrand").value = brand;
      document.getElementById("hiddenid").value = id;
  }
  const handleUpdate = async(e) => {
      e.preventDefault();
    let id = document.getElementById("hiddenid").value;
    let brandname = document.getElementById("editbrand").value;
    try{
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const brand = { "id": id, "name": brandname };
      const res = await axios.post("http://localhost:5000/api/brands/update", brand, config);
      if(res.data.status === true){
        alertify.success(res.data.msg);
        getData();
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
        <NavbarInner title="Brands" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              {/* Content Start */}
              <div className="card">
                <div className="card-body">
                  <form
                    className="col-sm-8 row mx-auto"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <label className="mt-2">Brand Name: </label>
                    <input
                      onChange={(e) => onChange(e)}
                      value={name}
                      type="text"
                      className="form-control col-sm-5 mx-2"
                      name="name"
                      required
                    />
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Add brand"
                    />
                  </form>
                  <hr />
                  <table className="table table-responsive-sm" id="myTable">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row._id}>
                    <td>{row.name}</td>
                    <td><button onClick={e => handleStatusChange(e)} id={row.status} name={row._id}  className="btn btn-sm userstatus">{row.status}</button></td>
                    <td>
                    <button onClick={e => handleEdit(e)} name={row._id} className="btn btn-outline-warning btn-sm fas fa-edit border-0 btn-edit"></button>
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
      {/* <!-- Modal --> */}
<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form onSubmit={e => handleUpdate(e)}>
            <div className="modal-body">
                <label>Brand Name</label>
                <input type="text" className="form-control" id="editbrand" name="name" required />
                <input type="hidden" id="hiddenid"/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary btn-close">Update</button>
            </div>
            </form>
        </div>
    </div>
</div>
    </>
  );
};

export default Brands;
