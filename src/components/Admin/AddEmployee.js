import React, { useState } from 'react'
import { Footer } from '../Footer';
import { NavbarInner } from './NavbarInner';
import { Sidebar } from './Sidebar';
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pass1: "",
        pass2: "",
        mobile: "",
        pincode: "",
        address: "",
        type: ""
      });
    
      const { name, email, pass1, pass2, mobile, pincode, address, type } = formData;
    
      const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
      const onSubmit = async(e) => {
        e.preventDefault();
        if(pass1 !== pass2){
          alertify.error('<strong>Error</strong>: Password does not match');
        }
        else{
          const newUser = {
            name,
            email,
            password: pass1,
            mobile,
            pincode,
            address,
            type
          }
          try {
            const config = {
              header:{
                "Content-Type": "application/json"
              }
            }
            let token = await localStorage.getItem("x-auth-token");
            axios.defaults.headers.common["x-auth-token"] = token;
            const res = await axios.post("http://localhost:5000/api/users/employee", newUser, config);
            if(res.data.status){
              alertify.success("Success: Employee has been registered successfully!");
              setFormData({
                name: "",
                email: "",
                pass1: "",
                pass2: "",
                mobile: "",
                pincode: "",
                address: "",
                type: ""
              });
            }
            else{
              alertify.error("Error: Something went wrong!");
            }
          } catch (err) {
            alertify.error(err.response.data['errors'][0].msg);
          // console.log(err.response.data['errors'][0].status);
          }
        }
    }
  return (
    <>
     <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Add Employee" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body col-sm-5 mx-auto">
              <form method="post" onSubmit={e => onSubmit(e)}>
              <label htmlFor="name">Full Name</label>
              <input
                name="name"
                value={name}
                id="name"
                type="text"
                className="form-control border border-secondary px-3 mb-2"
                required
                onChange={e => onChange(e)}
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                value={email}
                id="email"
                type="email"
                className="form-control border border-secondary px-3 mb-2"
                required
                onChange={e => onChange(e)}
              />
              <label htmlFor="pass1">Password</label>
              <input
                name="pass1"
                value={pass1}
                id="pass1"
                type="password"
                className="form-control border border-secondary px-3 mb-2"
                required
                onChange={e => onChange(e)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
              <label htmlFor="pass2">Confirm Password</label>
              <input
                name="pass2"
                value={pass2}
                id="pass2"
                type="password"
                className="form-control border border-secondary px-3 mb-2"
                required
                onChange={e => onChange(e)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
              <label htmlFor="mobile">Mobile</label>
              <input
                name="mobile"
                value={mobile}
                id="mobile"
                type="text"
                minLength="10"
                maxLength="10"
                className="form-control border border-secondary px-3 mb-2"
                required
                onChange={e => onChange(e)}
              />
              <label htmlFor="pincode">Pincode</label>
              <input
                name="pincode"
                value={pincode}
                id="pincode"
                type="text"
                minLength="6"
                maxLength="6"
                className="form-control border border-secondary px-3 mb-2"
                required
                onChange={e => onChange(e)}
              />
              <label htmlFor="address">Address</label>
              {/* <input name="name" id="name" type="text" className="form-control border border-secondary px-3 mb-2" required /> */}
              <textarea
                className="form-control border border-secondary px-3 mb-3"
                name="address"
                value={address}
                id="address"
                required
                onChange={e => onChange(e)}
              ></textarea>
              <label htmlFor="type">Employee Type</label>
              <select name="type" id="type" className='form-control mb-4' onChange={e => onChange(e)} value={type} required>
              <option value="" disabled>--- Select ---</option>
                <option value="2">Delivery Boy</option>
                <option value="3">Service Man</option>
                </select>
              <div className="text-center">
                <input
                  type="submit"
                  value="Add Employee"
                  className="btn btn-primary"
                />
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
  )
}

export default AddEmployee