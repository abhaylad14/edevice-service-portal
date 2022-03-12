import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'
import { Libraries } from './Libraries'
import { Navbar } from './Navbar'

const Login = () => {
  return (
    <>
    <Libraries />
    <Navbar />
    <main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('./images/loginbg.jpg')"}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                </div>
              </div>
              <div className="card-body">
                <form className="text-start">
                  <div className="input-group input-group-outline my-3">
                    <input type="email" className="form-control" placeholder='Email'/>
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input type="password" className="form-control" placeholder='Password' />
                  </div>
                  <div className='d-flex justify-content-end text-xs'>
                    <Link to="forgotpassword"  >Forgot Password?</Link>
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                  </div>
                  <p className="mt-4 text-sm text-center">
                    Don't have an account?
                    <Link to="/registration" className="text-primary text-gradient font-weight-bold"> Sign up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </main>
    <Footer />
    </>
  )
}

export default Login