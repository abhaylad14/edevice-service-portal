import React from 'react';
import { Link } from 'react-router-dom';
export const Header = () => {
    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <Link className="navbar-brand m-0" to="/user/dashboard">
        <img src={process.env.PUBLIC_URL +"/minilogo.png"} className="navbar-brand-img h-100" alt="main_logo" />
        <span className="ms-1 font-weight-bold text-white"> E-Serve</span>
      </Link>
    </div>
    <hr className="horizontal light mt-0 mb-2" />
    <div cssstyle="{{height: fit-content}}" className="collapse navbar-collapse overflow-hidden w-auto" id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-white active bg-gradient-primary" to="/admin/dashboard">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to="/admin/requests">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Requests</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to="/admin/users">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="fas fa-users"></i>
            </div>
            <span className="nav-link-text ms-1">Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white " to="/admin/services">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">receipt_long</i>
            </div>
            <span className="nav-link-text ms-1">Services</span>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/profile.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">person</i>
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
        </>
    )
}