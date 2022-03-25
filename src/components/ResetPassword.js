import React, { useState } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    let navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    password1: "",
    password2: ""
  });
  const { password1, password2 } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
      const handleSubmit = async(e) => {
          e.preventDefault();
          if(password1 === password2){
            try{
                const config = {
                  header:{
                    "Content-Type": "application/json",
                  }
                }
                const queryParams = new URLSearchParams(window.location.search);
                const id = queryParams.get('q');
                const data = {
                    password: password1,
                    resetToken: id
                }
                const res = await axios.post(`http://localhost:5000/api/auth/resetpassword`, data, config);
                if(res.data.status === true){
                  alertify.success("Password updated successfully")
                  navigate("/login");
                }
                else{
                    console.log(res.data);
                    alertify.error("Error: Something went wrong!");
                    navigate("/forgotpassword");
                }
              }
              catch(err){
                alertify.error(err.response.data['errors'][0].msg);
              }
          }
          else{
              alertify.error("Password does not match");
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
          <div className="col-lg-5 col-md-8 col-12 mx-auto" style={{marginTop: "7%"}}>
              <div className='card'>
              <div className="card-body">
                <h3 className='text-center mb-4'>Reset Password</h3>
                <form onSubmit={e => handleSubmit(e)}>
                    <label className='ml-2'>New Password</label>
                    <input name='password1' type="password" onChange={e => onChange(e)} value={password1} className="form-control mb-3" placeholder='Enter new password' required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
                    <label className='ml-2'>Confirm Password</label>
                    <input name='password2' type="password" onChange={e => onChange(e)} value={password2} className="form-control" placeholder='Re-enter new password' required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
                    <button type="submit" className="btn btn-primary w-100 my-4 mb-2">Reset Password</button>
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

export default ResetPassword