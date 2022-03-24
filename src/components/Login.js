import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    setFormData({email: "", password : ""});
    try {
      const config = {
        header:{
          "Content-Type": "application/json"
        }
      }
      const res = await axios.post("http://localhost:5000/api/auth", data, config);
      if(res.data.status === true){
        localStorage.setItem("x-auth-token", res.data.token);
        let userType = res.data.userType;
        if(userType === 0){
          alertify.success("Login success: Welcome Admin");
          navigate("/admin/dashboard");
        }
        else if(userType === 1){
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
        else{
          console.log(res.data);
          alertify.error("Error: Something went wrong!");
        }
      }
      else if(res.data.status === false){
        alertify.success(res.data.msg);
        localStorage.setItem("email", email);  
        navigate("/verifyaccount");
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
    <Navbar />
    <main className="main-content mt-0" style={{marginBottom: "10%"}}>
    <div className="page-header align-items-start">
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto" style={{marginTop: "7%"}}>
              <div className='card'>
              <div className="card-body">
                <h3 className='text-center'>Login</h3>
                <form onSubmit={e => handleSubmit(e)} className="text-start">
                  <div className="input-group input-group-outline my-3">
                    <input name='email' type="email" onChange={e => onChange(e)} value={email} className="form-control" placeholder='Email' required/>
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input name='password' type="password" onChange={e => onChange(e)} value={password} className="form-control" placeholder='Password' required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
                  </div>
                  <div className='d-flex justify-content-end text-xs'>
                    <Link to="forgotpassword"  >Forgot Password?</Link>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary   w-100 my-4 mb-2">Login</button>
                  </div>
                  <p className="mt-4 text-sm text-center">
                    Don't have an account?
                    <Link to="/registration" className="text-primary text-gradient font-weight-bold"> Sign up</Link>
                  </p>
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

export default Login