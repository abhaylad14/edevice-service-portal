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
                  <Link to="/user/dashboard" className="mt-2"> 
                  {/* mm-active */}
                    <i className="metismenu-icon pe-7s-rocket"></i>
                    Dashboard 
                  </Link>
                </li>
                {/* <li className="app-sidebar__heading">Users</li> */}
                <li>
                  <Link to="/user/addrequest" className="mt-2"> 
                    <i className="metismenu-icon far fa-comment"></i>
                    Add Request 
                  </Link>
                </li>
                <li>
                  <Link to="/user/requests" className="mt-2"> 
                    <i className="metismenu-icon far fa-comment-dots"></i>
                    Requests 
                  </Link>
                </li>
                <li>
                  <Link to="/user/profile" className="mt-2"> 
                    <i className="metismenu-icon far fa-user"></i>
                    Profile 
                  </Link>
                </li>
                <li>
                  <Link to="/user/feedback" className="mt-2"> 
                    <i className="metismenu-icon far fa-comments"></i>
                    Feedback 
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </>
    )
}