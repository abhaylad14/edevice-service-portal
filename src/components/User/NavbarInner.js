import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/user/userContext'

export const NavbarInner = (props) => {
  const user = useContext(userContext);
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
                    <div className="widget-heading">{user.state.name}</div>
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
                          alt="Error"
                        />
                        <i className="fa fa-angle-down ml-2 opacity-8"></i>
                      </span> 
                      <div
                        tabIndex="-1"
                        role="menu"
                        aria-hidden="true"
                        className="dropdown-menu dropdown-menu-right"
                      >
                        <button
                          type="button"
                          tabIndex="0"
                          className="dropdown-item"
                        >
                          User Account
                        </button>
                        <button
                          type="button"
                          tabIndex="0"
                          className="dropdown-item"
                        >
                          Settings
                        </button>
                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                        <button
                          type="button"
                          tabIndex="0"
                          className="dropdown-item"
                        >
                          Actions
                        </button>
                        <div tabIndex="-1" className="dropdown-divider"></div>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => { console.log("button clicked");}}
                        >
                          Logout
                        </button>
                      </div>
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
