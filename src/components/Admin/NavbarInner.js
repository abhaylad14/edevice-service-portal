import React from 'react'
import { useNavigate } from 'react-router-dom';

export const NavbarInner = (props) => {
  let navigate = useNavigate();
  const handleLogout = async(e) => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
    <div className="app-header header-shadow">
        <div className="app-header__logo">
          <img alt='Error' height="40" src={process.env.PUBLIC_URL + '/mylogo.PNG'} />
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar">
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
        <div className="app-header__content">
          <div className="app-header-left">
            <div className="search-wrapper">
              <button className="close"></button>
            </div>
            <ul className="header-menu nav">
              <li className="dropdown nav-item">
                <span className="nav-link">
                  <strong>{props.title}</strong>
                </span>
              </li>
            </ul>
          </div>
          <div className="app-header-right">
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  
                  <div className="widget-content-left ml-3 header-user-info mx-2">
                    <div className="widget-heading">Admin</div>
                  </div>
                  <div className="widget-content-left">
                    <div className="btn-group">
                      <span
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="p-0 btn"
                      >
                        <img
                          width="42"
                          className="rounded-circle mx-2"
                          src={process.env.PUBLIC_URL + '/user.png'}
                          alt="error"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="widget-content-right header-user-info ml-3">
                    <button className='btn btn-primary' onClick={(e) => handleLogout(e)} >Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
