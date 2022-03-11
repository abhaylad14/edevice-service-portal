import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
        <nav className="navbar container mx-auto navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div className="container-fluid ps-2 pe-0">
            <Link className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " to="/">
              {/* eServe */}
              <img src="./mylogo.png" height="40" alt="error in loading logo"></img>
            </Link>
            <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon mt-2">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </span>
            </button>
            <div className="collapse navbar-collapse ps" id="navigation">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                    <i className="fa fa-chart-pie opacity-6 text-dark me-1" aria-hidden="true"></i>
                    About us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/profile.html">
                    <i className="fa fa-user opacity-6 text-dark me-1" aria-hidden="true"></i>
                    Contact us
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/sign-up.html">
                    <i className="fas fa-user-circle opacity-6 text-dark me-1" aria-hidden="true"></i>
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/sign-in.html">
                    <i className="fas fa-key opacity-6 text-dark me-1" aria-hidden="true"></i>
                    Sign In
                  </a>
                </li> */}
              </ul>
              <ul className="navbar-nav d-lg-block d-none">
                <li className="nav-item">
                  <Link to="/registration" className="btn btn-sm mb-0 me-1 btn-primary">Register Now</Link>
                  <Link to="/login" className="btn btn-sm mb-0 me-1 btn-info">Login</Link>
                </li>
              </ul>
            <div className="ps__rail-x" style={{left: "0", bottom: "0"}}><div className="ps__thumb-x" tabIndex="0" style={{left: "0", width: "0"}}></div></div><div className="ps__rail-y" style={{top: 0, right: 0}}><div className="ps__thumb-y" tabIndex="0" style={{top: "0px", height: "0px"}}></div></div></div>
          </div>
        </nav>
        </>
    )
}
