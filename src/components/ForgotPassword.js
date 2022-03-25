import React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { useState } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    email: "",
  });
  const { email } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormData({email: ""});
    try {
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      } 
      const emaildata = {
        email
      }
      const res = await axios.post("http://localhost:5000/api/auth/forgotpassword", emaildata, config);
      if(res.data.status){
        alertify.success(res.data.msg);
        navigate("/login");
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
                <h3 className='text-center mb-4'>Forgot Password</h3>
                <form onSubmit={e => handleSubmit(e)} >
                      <label className='ml-2'>Enter your registered Email</label>
                      <input name='email' type="email" onChange={e => onChange(e)} value={email} className="form-control" placeholder='Email' required/>
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

export default ForgotPassword;