import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { NavbarInner } from "./NavbarInner";
import { Sidebar } from "./Sidebar";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });
  const { title , desc } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title, desc,
    };
    setFormData({ title: "" , desc: "" });
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      let token = await localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.post(
        "http://localhost:5000/api/feedback/addfeedback",
        data,
        config
      );
      if (res.data.status === true) {
     
        alertify.success(res.data.msg);
      } else {
        alertify.error("Somthing went wrong!");
      }
    } catch (err) {
      alertify.error(err.response.data["errors"][0].msg);
    }
  }
  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Feedback" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              {/* Content Start */}
              <div className="card">
                <div className="card-body col-sm-5 mx-auto mt-3">
                <form onSubmit={e => handleSubmit(e)}>
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      onChange={e => onChange(e)} value={title}
                      className="form-control mb-2"
                      required
                    />
                    <label>Description</label>
                    <textarea
                      type="text"
                      name="desc"
                      onChange={e => onChange(e)} value={desc}
                      className="form-control mb-2"
                      required
                    ></textarea>
                        <div className="text-center">
                      <input type="submit" className="btn btn-primary mt-2" value="Submit Feedback" />
                    </div>
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
  );
};

export default Feedback;
