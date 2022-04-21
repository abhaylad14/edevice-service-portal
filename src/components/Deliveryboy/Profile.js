import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";
import { Sidebar } from "./Sidebar";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";
import { VerifyDeliveryBoy, VerifyToken } from "../Authguard";

const Profile = () => {
    const [email, setEmail] = useState()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    address: "" 
  });
  const { name, mobile, pincode, address } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  useEffect(()=> {
    VerifyToken();
    VerifyDeliveryBoy();
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
      const res = await axios.get("http://localhost:5000/api/profile/me", "",config);
      if(res.data.status === true){
        console.log(res.data.profile);
        setFormData({name: res.data.profile.name, mobile: res.data.profile.mobile, pincode: res.data.profile.pincode, address: res.data.profile.address})
        document.getElementById("email").value = res.data.profile.email;
        setEmail(res.data.profile.email);
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
  const handleSubmit = async(e) => {
      e.preventDefault();
      const profile = {
        name,
        mobile,
        pincode,
        address
      };
      try {
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        let token = await localStorage.getItem("x-auth-token");
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.post("http://localhost:5000/api/profile/update",
          profile,
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
  }
  const handleChange = async(e) => {
    try {
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        const pdata = {email}
        const res = await axios.post("http://localhost:5000/api/auth/forgotpassword",
          pdata,
          config
        );
        if (res.data.status === true) {
          alertify.success(res.data.msg);
        } else {
          alertify.error("Somthing went wrong!");
        }
      } catch (err) {
        alertify.error(err.response.data["errors"][0].msg);
      }
  }
  return (
    <>
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Profile" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body col-sm-6 mx-auto">
                  <h4 className="text-center">Profile</h4>
                  <hr />
                  <form onSubmit={e => handleSubmit(e)}>
                  <div className="row">
                    <div className="col-sm-6">
                        <label>Name</label>
                        <input type="text" className="form-control" onChange={e => onChange(e)} value={name} id="name"  name="name" required />
                    </div>
                    <div className="col-sm-6">
                        <label>Email</label>
                        <input id="email" className="form-control" disabled />
                    </div>
                    <div className="col-sm-6 mt-2">
                        <label>Mobile No.</label>
                        <input id="mobile" type="text" maxLength="10" minLength="10" value={mobile} onChange={e => onChange(e)} className="form-control" name="mobile" required />
                    </div>
                    <div className="col-sm-6 mt-2">
                        <label>Password</label>
                        <button type="button" onClick={e => handleChange(e)} className="btn w-100 btn-primary btn-edit">Change Password</button>
                    </div>
                    <div className="col-sm-6 mt-2">
                        <label>Pincode</label>
                        <input type="text" id="pincode" onChange={e => onChange(e)} value={pincode} className="form-control" maxLength="6" minLength="6" name="pincode" required />
                    </div>
                    <div className="col-sm-12 mt-2">
                        <label>Address</label>
                        <textarea type="text" id="address" onChange={e => onChange(e)} value={address} className="form-control" name="address" required ></textarea>
                    </div>
                    <div className="text-center col-sm-12 mt-3">
                        <button className="btn btn-primary" type="submit">Update Profile</button>
                    </div>
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

export default Profile