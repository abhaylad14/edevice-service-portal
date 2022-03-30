import React, { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { NavbarInner } from './NavbarInner'
import { Sidebar } from './Sidebar'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom'
import { VerifyCustomer, VerifyToken } from '../Authguard'

const Request = () => {
  let navigate = useNavigate();
  const [ data, setData ] = useState([]);
  const [ rdata, setRData ] = useState([]);
  // const [ chklist, setChklist ] = useState([]);
  useEffect(()=> {
    VerifyToken();
    VerifyCustomer();
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
      const res = await axios.get("http://localhost:5000/api/complain/mycomplains", "", config);
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
  const handleRequest = async(e) => {
    //   console.log(e.target.id);
    let id = e.target.name;
    try {
        const config = {
            header:{
              "Content-Type": "application/json",
            }
          }
          let token = await localStorage.getItem("x-auth-token");
          axios.defaults.headers.common["x-auth-token"] = token;
          const complain = { id }
          let url = "";
          if(e.target.id === "1"){
                url = "http://localhost:5000/api/complain/acceptservice";
          }
          else if(e.target.id === "2"){
                url = "http://localhost:5000/api/complain/rejectservice";
          }
          console.log(url)
          const res = await axios.post(url, complain, config);
          if(res.data.status === true){
            if(e.target.id === "1"){
                e.target.parentElement.children[1].remove();
                e.target.parentElement.children[0].remove();
          }
          else if(e.target.id === "2"){
            e.target.parentElement.children[0].remove();
            e.target.parentElement.children[0].remove();
          }
            alertify.success(res.data.msg)
           
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
          const res = await axios.post("http://localhost:5000/api/complain/viewrequest", cdata, config);
          if(res.data.status === true){
            setRData(res.data.complains);
            // setChklist(res.data.complains[0].chklist)
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
      const res = await axios.post("http://localhost:5000/api/complain/delete", request, config);
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
  const ViewInvoice = async(e) => {
    let id = e.target.name;
    navigate(`/user/invoice?id=${id}`);
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
                    <td>{row.title}</td>
                    <td>{row.desc}</td>
                    <td>{row.brand}</td>
                    <td>{row.modelname}</td>
                    <td>{row.modelno}</td>
                    <td className='rstatus badge mt-1'>{row.status}</td>
                    <td>
                    <button style={{visibility: "hidden"}} onClick={e => handleDelete(e)} name={row._id} className="btn btn-outline-danger btn-sm fas fa-trash-alt border-0 crbtn-delete"></button>
                    <button onClick={e => viewRequest(e)} name={row._id} className="btn btn-outline-info btn-sm fas fa-eye border-0 btn-edit"> View</button>
                    <button style={{visibility: "hidden"}} id="1" onClick={e => handleRequest(e)} name={row._id} className="btn btn-outline-success btn-sm fas fa-check border-0 cbtn-accept"> Accept</button>
                    <button style={{visibility: "hidden"}} id="2" onClick={e => handleRequest(e)} name={row._id} className="btn btn-outline-danger btn-sm fas fa-times border-0 cbtn-reject"> Reject</button>
                    
                    <button onClick={e => ViewInvoice(e)} name={row._id} className="btn btn-outline-info btn-sm fas fa-eye border-0 viewbill"> View invoice</button>
                    
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
                  <tr><td><strong className='mr-2'>Title: </strong></td><td>{x.title}</td></tr>
                  <tr><td><strong className='mr-2'>Description: </strong></td><td>{x.desc}</td></tr>
                  <tr><td><strong className='mr-2'>Brand: </strong></td><td>{x.brand}</td></tr>
                  <tr><td><strong className='mr-2'>Model Name: </strong></td><td>{x.modelname}</td></tr>
                  <tr><td><strong className='mr-2'>ModelNo: </strong></td><td>{x.modelno}</td></tr>
                  {Object.entries(x.chklist).map(([k,v]) => (<tr><td><strong className='mr-2'>{k}: </strong></td><td>{v}</td></tr>))}
                  <tr><td><h4 className='mr-2'>Total: </h4></td><td><h4>{x.estimate}</h4></td></tr>
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

export default Request