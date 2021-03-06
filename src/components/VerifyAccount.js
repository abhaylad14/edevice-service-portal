import React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { useState } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom'

const VerifyAccount = () => {
  let navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    otp: "",
  });
  const { otp } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const handleSubmit = async(e) => {
    e.preventDefault();
    const otpdata = {
      email : localStorage.getItem("email"),
      "otp": otp
    }
    setFormData({otp: ""});
    try {
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      } 
      const res = await axios.post("http://localhost:5000/api/auth/verifyotp", otpdata, config);
      if(res.data.status){
        alertify.success("success: OTP verified");
        let userType = res.data.userType;
        if(userType === 1){
          alertify.success("Login success: Welcome Customer");
          navigate("/user/dashboard");
        }
        else if(userType === 2){
          alertify.success("Login success: Welcome Delivery boy");
          navigate("/deliveryboy/dashboard");
        }
        else if(userType === 3){
          alertify.success("Login success: Welcome Service man");
          navigate("/serviceman/dashboard");
        }
      }
      else{
        alertify.error("Error: Something went wrong!");
      }
    } catch (err) {
      alertify.error(err.response.data['errors'][0].msg);
    }
  }
  return (
    <>
    <Navbar />
    <main className="main-content mt-0" style={{marginBottom: "10%"}}>
    <div className="page-header align-items-start">
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto" style={{marginTop: "7%"}}>
              <div className='card'>
              <div className="card-body">
                <h3 className='text-center'>Verify Account</h3>
                <form onSubmit={e => handleSubmit(e)} >
                  <div className="input-group input-group-outline my-3">
                    <input name='otp' onChange={e => onChange(e)} value={otp} title='Must require 6 digits OTP' type="text" pattern="^[0-9]{6}$" className="form-control" placeholder='Enter OTP here' required/>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100 my-4 mb-2">Submit</button>
                  </div>
                </form>
              </div>
              </div>
          </div>
        </div>
      </div>
     
    </div>
  </main>
    <Footer />
    </>
  )
}

export default VerifyAccount