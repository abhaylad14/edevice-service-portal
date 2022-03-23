import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavbarInner title="Dashboard" />
        <div className="container-fluid py-4">
          <div className="card">
            <div className="card-body">
              <h3>Welcome admin</h3>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
