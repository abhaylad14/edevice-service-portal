import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
        <div className="app-header header-shadow">
        <div className="app-header__logo">
          <img alt='Error' height="40" src={process.env.PUBLIC_URL + '/mylogo.PNG'} />
          {/* <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div> */}
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6"></i>
              </span>
            </button>
          </span>
        </div>
        <div className="app-header__content">
          <div className="app-header-left">
            <div className="search-wrapper">
              <button className="close"></button>
            </div>
            <ul className="header-menu nav">
              <li className="dropdown nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-link-icon fa fa-home text-dark"></i>
                  Home
                </a>
              </li>
              <li className="dropdown nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-link-icon fa fa-user text-dark"></i>
                  About us
                </a>
              </li>
              <li className="dropdown nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-link-icon fa fa-home text-dark"></i>
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="app-header-right">
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  
                  <div className="widget-content-left ml-3 header-user-info mx-2">
                    <ul className="navbar-nav d-lg-block d-none">
                      <li className="nav-item">
                        <Link to="/registration" className="btn btn-primary mx-2">Register Now</Link>
                        <Link to="/login" className="btn btn-info">Login</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="widget-content-right header-user-info ml-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* <nav className="navbar container mx-auto navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div className="container-fluid ps-2 pe-0">
            <Link className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " to="/">
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
                <li className="nav-item">
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
                </li>
              </ul>
              <ul className="navbar-nav d-lg-block d-none">
                <li className="nav-item">
                  <Link to="/registration" className="btn btn-sm mb-0 me-1 btn-primary">Register Now</Link>
                  <Link to="/login" className="btn btn-sm mb-0 me-1 btn-info">Login</Link>
                </li>
              </ul>
            <div className="ps__rail-x" style={{left: "0", bottom: "0"}}><div className="ps__thumb-x" tabIndex="0" style={{left: "0", width: "0"}}></div></div><div className="ps__rail-y" style={{top: 0, right: 0}}><div className="ps__thumb-y" tabIndex="0" style={{top: "0px", height: "0px"}}></div></div></div>
          </div>
        </nav> */}
        </>
    )
}
