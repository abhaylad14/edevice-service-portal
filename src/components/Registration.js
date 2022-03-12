import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Libraries } from "./Libraries";
import { Footer } from "./Footer";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types'

const Registration = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass1: "",
    pass2: "",
    mobile: "",
    pincode: "",
    address: "",
  });

  const { name, email, pass1, pass2, mobile, pincode, address } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async(e) => {
    e.preventDefault();
    if(pass1 !== pass2){
      setAlert("Password does not match", "danger");
    }
    else{
      const newUser = {
        name,
        email,
        password: pass1,
        mobile,
        pincode,
        address
      }
      try {
        const config = {
          header:{
            "Content-Type": "application/json"
          }
        }
        const res = await axios.post("http://localhost:5000/api/users", newUser, config);
        console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  }
  return (
    <>
      <Libraries />
      <Navbar />
      <div className="container" style={{ marginTop: 95 }}>
        <div className="card">
          <div className="card-body col-sm-5 mx-auto">
            <h4 className="text-center">Registration form </h4>
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
              <div className="text-center">
                <input
                  type="submit"
                  value="Register Now"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

Registration.propTypes = {
  setAlert:PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Registration);
