import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavbarInner />
        <div className="container-fluid py-4">
            <h1>Deliveryboy Dashboard</h1>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
