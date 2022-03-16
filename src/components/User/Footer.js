import React from 'react'

export const Footer = () => {
    return (
        <div>
            <footer className="footer py-4  ">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © {new Date().getFullYear()},
                made with <i className="fa fa-heart"></i> by
                <a href="https://dev.to/abhaylad14" rel="noreferrer" className="font-weight-bold" target="_blank"> Abhay Lad </a>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" rel="noreferrer" className="nav-link text-muted" target="_blank">Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" rel="noreferrer" className="nav-link text-muted" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/blog" rel="noreferrer" className="nav-link text-muted" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/license" rel="noreferrer" className="nav-link pe-0 text-muted" target="_blank">License</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </footer>
        </div>
    )
}
