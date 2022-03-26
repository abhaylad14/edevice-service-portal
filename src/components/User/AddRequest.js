import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";
import { Sidebar } from "./Sidebar";
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const AddRequest = () => {
  const [ formData, setFormData ] = useState({
    title: "",
    desc: "",
    brand: "",
    modelname: "",
    modelno: ""
  });
  const { title, desc, brand, modelname, modelno } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
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
      const res = await axios.get("http://localhost:5000/api/brands/getbrands", "",config);
      if(res.data.status === true){
        console.log(res.data.brands);
        setData(res.data.brands);
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      title,
      desc,
      brand,
      modelname,
      modelno
    }
    setFormData({title: "", desc: "", brand: "", modelname: "", modelno: ""});
    try {
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      }
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.post("http://localhost:5000/api/complain/add", data, config);
      if(res.data.status === true){
        alertify.success(res.data.msg);
      }
      else{
        alertify.error("Error: Something went wrong!");
      }
    } catch (err) {
      alertify.error(err.response.data['errors'][0].msg);
      // console.log(err.response.data['errors'][0].status);
    }
  }
  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Add Request" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              {/* Content Start */}
              <div className="card">
                <div className="card-body col-sm-5 mx-auto">
                  <form onSubmit={e => handleSubmit(e)}>
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control mb-2"
                      onChange={e => onChange(e)} value={title}
                      required
                    />
                    <label>Description</label>
                    <textarea
                      type="text"
                      name="desc"
                      className="form-control mb-2"
                      onChange={e => onChange(e)} value={desc}
                      required
                    ></textarea>
                    <label>Brand</label>
                    <select className="form-control mb-2" onChange={e => onChange(e)} value={brand} name="brand" required>
                    <option value="" disabled defaultValue>--- Select Brand ---</option>
                      { data.map(row => (<option key={row._id} value={row.id}>{row.name}</option>)) }
                    </select>
                    <label>Model Name</label>
                    <input className="form-control mb-2" onChange={e => onChange(e)} value={modelname} type="text" name="modelname" required />
                    <label>Model No.</label>
                    <input className="form-control mb-2" type="text" onChange={e => onChange(e)} value={modelno} name="modelno" required />
                    <div className="text-center">
                      <input type="submit" className="btn btn-primary mt-2" value="Submit Request" />
                    </div>
                  </form>
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

export default AddRequest;
