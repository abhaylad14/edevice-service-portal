import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";

const Users = () => {
  return (
    <div>
      <Header />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <NavbarInner title="Users" />
        <div className="container-fluid py-4">
          <div className="card">
            <div className="card-body">
              <table id="myTable" className="table table-responsive-sm">
                <thead className="table-info">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </main>
      {/* {loadDataTable()} */}
    </div>
  );
};

const loadDataTable = () => {
    document.getElementById("myTable").DataTable()
}

export default Users;
