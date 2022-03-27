import React from "react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";

const Dashboard = () => {
  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Dashboard" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body">
                <h5>Serviceman Dashboard</h5>
              </div>
            </div>
            {/* Content End */}
          </div>
          <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
