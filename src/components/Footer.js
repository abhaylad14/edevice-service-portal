import React from 'react'

export const Footer = () => {
    return (
        <>
            <div className="app-wrapper-footer">
            <div className="app-footer">
              <div className="app-footer__inner">
                <div className="app-footer-left">
                  {/* <ul className="nav">
                    <li className="nav-item">
                      <a href="/" className="nav-link">
                        Footer Link 1
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/" className="nav-link">
                        Footer Link 2
                      </a>
                    </li>
                  </ul> */}
                </div>
                <div className="app-footer-right">
                  <ul className="nav">
                    {/* <li className="nav-item">
                      <a href="/" className="nav-link">
                        Footer Link 3
                      </a>
                    </li> */}
                    <li className="nav-item">
                      <a target="_blank" href="https://abhaylad14.github.io/abhay-lad-portfolio/" className="nav-link">
                        <div className="badge badge-success mr-1 ml-0">
                        </div>
                        Made by: Abhay Priya Shrey
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
