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
                made by
                <a href="https://dev.to/abhaylad14" rel="noreferrer" className="font-weight-bold" target="_blank"> Abhay Lad, </a>
                <a href="/" rel="noreferrer" className="font-weight-bold" target="_blank"> Priya Kanabar, </a>
                <a href="/" rel="noreferrer" className="font-weight-bold" target="_blank"> Shrey Patel </a>

              </div>
            </div>
            <div className="col-lg-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="/" rel="noreferrer" className="nav-link text-dark" target="_blank"><strong>E-Serve</strong>: E Device Service Center</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
        </div>
    )
}
