import React from 'react'
import { Footer } from './Footer'
import { NavbarInner } from './NavbarInner'
import { Sidebar } from './Sidebar'

const AddRequest = () => {
  return (
    <>
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Add Request" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body col-sm-5 mx-auto">
                  <form>
                    <label>Title</label>
                    <input type="text" name="title" className='form-control mb-2' required />
                    <label>Description</label>
                    <textarea type="text" name="desc" className='form-control mb-2' required></textarea>
                  </form>
              </div>
            </div>
            {/* Content End */}
          </div>
          <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRequest