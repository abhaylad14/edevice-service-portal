import React, { useEffect, useState } from 'react'
import { Footer } from '../Footer';
import { NavbarInner } from './NavbarInner';
import { Sidebar } from './Sidebar';
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { VerifyDeliveryBoy, VerifyToken } from '../Authguard';

const PickupRequests = () => {
    const [ data, setData ] = useState([]);
    const [ rdata, setRData ] = useState([]);
  useEffect(()=> {
    VerifyToken();
    VerifyDeliveryBoy();
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
      const res = await axios.get("http://localhost:5000/api/complain/pickuprequests", "", config);
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
  const viewRequest = async(e) => {
    //   console.log(e.target.id);
    let id = e.target.name;
    const cdata = { id };
    try {
        const config = {
            header:{
              "Content-Type": "application/json",
            }
          }
          let token = await localStorage.getItem("x-auth-token");
          axios.defaults.headers.common["x-auth-token"] = token;
          const res = await axios.post("http://localhost:5000/api/complain/getone", cdata, config);
          if(res.data.status === true){
            setRData(res.data.complains)
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
  const updateStatus = async(e) => {
    let id = e.target.id;
    let status = e.target.value;
    const cdata = { id, status };
    try {
        const config = {
            header:{
              "Content-Type": "application/json",
            }
          }
          let token = await localStorage.getItem("x-auth-token");
          axios.defaults.headers.common["x-auth-token"] = token;
          const res = await axios.post("http://localhost:5000/api/complain/updatestatus", cdata, config);
          if(res.data.status === true){
            alertify.success(res.data.msg);
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
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                    data.map(row => (
                      <tr key={row._id}>
                    <td>{row.userdetails[0].name}</td>
                    <td>{row.title}</td>
                    <td ><button className='rstatus btn btn-sm'>{row.status}</button></td>
                    <td>
                    <button onClick={e => viewRequest(e)} name={row._id} className="btn btn-outline-info btn-sm fas fa-eye border-0 btn-edit"> View</button>
                    </td><td>
                    <select id={row._id} value={row.status !== undefined ? row.status : ""} onChange={e => updateStatus(e)} className='form-control col-sm-8' name='sid'> 
                    <option value="" disabled>--- Select ---</option>
                    <option value="3">Waiting for pickup</option>
                    <option value="4">Picked up</option>
                    <option value="5">Delivered to the company</option>
                    </select>
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
                <h5 className="modal-title" id="exampleModalLabel">Details</h5>
                <button type="button" className="close btn-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <table>
                {rdata.map(x => (
                <tbody key={x._id}>
                  <tr><td><strong className='mr-2'>Customer Name: </strong></td><td>{x.userdetails[0].name}</td></tr>
                  <tr><td><strong className='mr-2'>Mobile No: </strong></td><td>{x.userdetails[0].mobile}</td></tr>
                  <tr><td><strong className='mr-2'>Pincode: </strong></td><td>{x.userdetails[0].pincode}</td></tr>
                  <tr><td><strong className='mr-2'>Address: </strong></td><td>{x.userdetails[0].address}</td></tr>
                  <tr><td><strong className='mr-2'>Title: </strong></td><td>{x.title}</td></tr>
                  <tr><td><strong className='mr-2'>Description: </strong></td><td>{x.desc}</td></tr>
                  <tr><td><strong className='mr-2'>Brand: </strong></td><td>{x.brand}</td></tr>
                  <tr><td><strong className='mr-2'>Model Name: </strong></td><td>{x.modelname}</td></tr>
                  <tr><td><strong className='mr-2'>ModelNo: </strong></td><td>{x.modelno}</td></tr>
                  </tbody>
                ))}
            </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default PickupRequests