import React from 'react';
import { Link } from 'react-router-dom';
export const Sidebar = () => {
    return (
        <>
            <div className="app-sidebar sidebar-shadow">
          <div className="app-header__logo">
            <div className="logo-src"></div>
            <div className="header__pane ml-auto">
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
            </div>
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
          <div className="scrollbar-sidebar">
            <div className="app-sidebar__inner">
              <ul className="vertical-nav-menu">
                {/* <li className="app-sidebar__heading">Dashboards</li> */}
                <li>
                  <Link to="/admin/dashboard" className="mt-2"> 
                  {/* mm-active */}
                    <i className="metismenu-icon pe-7s-rocket"></i>
                    Dashboard 
                  </Link>
                </li>
                <li>
                  <Link to="/admin/brands" className="mt-2">
                    <i className="metismenu-icon fas fa-building"></i>
                    Brands 
                  </Link>
                </li>
                <li>
                  <Link to="/admin/requests" className="mt-2">
                    <i className="metismenu-icon far fa-comment"></i>
                    Requests 
                  </Link>
                </li>
                <li>
                  <Link to="/admin/assignrequest" className="mt-2">
                    <i className="metismenu-icon fas fa-comment"></i>
                    Assign Request 
                  </Link>
                </li>
                <li>
                  <Link to="/admin/feedbacks" className="mt-2">
                    <i className="metismenu-icon far fa-comments"></i>
                    Feedback
                  </Link>
                </li>
                <li className="app-sidebar__heading">Users</li>
                <li>
                  <Link to="/admin/customers" className="mt-2">
                    <i className="metismenu-icon fas fa-users"></i>
                    Customers 
                  </Link>
                </li>
                <li>
                  <Link to="/admin/deliveryboys" className="mt-2">
                    <i className="metismenu-icon fas fa-users"></i>
                    Delivery Boys 
                  </Link>
                </li>
                <li>
                  <Link to="/admin/servicemen" className="mt-2">
                    <i className="metismenu-icon fas fa-users"></i>
                    Servicemen 
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </>
    )
}