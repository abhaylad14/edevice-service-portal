import React from 'react'
import { Footer } from '../Footer';
import { NavbarInner } from './NavbarInner';
import { Sidebar } from './Sidebar';
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom';

const SetEstimate = () => {
  let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        let chklist = {};
        let eid = "";
        let estimate = 0;
        for(let i=1; i <= 15; i++){
            eid = `chk${i}`;
            if(document.getElementById(eid).checked){
                let name = document.getElementById(eid).name;
                let value = document.getElementById(eid).value;
                chklist[name] = value;
                estimate += parseInt(value);
            }
        }
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const reqdata = {
            id, chklist, estimate
        }
        try {
            const config = {
              header:{
                "Content-Type": "application/json"
              }
            }
            let token = await localStorage.getItem("x-auth-token");
            axios.defaults.headers.common["x-auth-token"] = token;
            const res = await axios.post("http://localhost:5000/api/complain/setestimate", reqdata, config);
            if(res.data.status){
              alertify.success(res.data.msg);
              navigate("/serviceman/servicerequests")
            }
            else{
              alertify.error("Error: Something went wrong!");
            }
          } catch (err) {
            alertify.error(err.response.data['errors'][0].msg);
          // console.log(err.response.data['errors'][0].status);
          }
    }

  return (
    <>
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <NavbarInner title="Set estimate" />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
            {/* Content Start */}
            <div className="card">
              <div className="card-body mx-auto col-sm-3">
                  <h4 className='text-center'>Service Checklist</h4>
                  <form onSubmit={e => handleSubmit(e)}>
                  <input type="checkbox" className='mx-2' id="chk1" name="Signal test" value="100" />
                  <label htmlFor="chk1"> Signal test</label><br />
                  <input type="checkbox" className='mx-2' id="chk2" name="Wifi test" value="100" />
                  <label htmlFor="chk2"> Wifi test</label><br />
                  <input type="checkbox" className='mx-2' id="chk3" name="Digitizer test" value="200" />
                  <label htmlFor="chk3"> Digitizer test</label><br />
                  <input type="checkbox" className='mx-2' id="chk4" name="Screen test" value="500" />
                  <label htmlFor="chk4"> Screen test</label><br />
                  <input type="checkbox" className='mx-2' id="chk5" name="Ear piece test" value="200" />
                  <label htmlFor="chk5"> Ear piece test</label><br />
                  <input type="checkbox" className='mx-2' id="chk6" name="Speaker test" value="100" />
                  <label htmlFor="chk6"> Speaker test</label><br />
                  <input type="checkbox" className='mx-2' id="chk7" name="Mic test" value="100" />
                  <label htmlFor="chk7"> Mic test</label><br />
                  <input type="checkbox" className='mx-2' id="chk8" name="Volume test" value="100" />
                  <label htmlFor="chk8"> Volume test</label><br />
                  <input type="checkbox" className='mx-2' id="chk8" name="Buttons test" value="100" />
                  <label htmlFor="chk8"> Buttons test</label><br />
                  <input type="checkbox" className='mx-2' id="chk9" name="Buttons test" value="100" />
                  <label htmlFor="chk9"> Charging test</label><br />
                  <input type="checkbox" className='mx-2' id="chk10" name="On/Off test" value="100" />
                  <label htmlFor="chk10"> On/Off test</label><br />
                  <input type="checkbox" className='mx-2' id="chk11" name="On/Off test" value="100" />
                  <label htmlFor="chk11"> Vibrate test</label><br />
                  <input type="checkbox" className='mx-2' id="chk12" name="Camera test" value="500" />
                  <label htmlFor="chk12"> Camera test</label><br />
                  <input type="checkbox" className='mx-2' id="chk13" name="Proximity test" value="100" />
                  <label htmlFor="chk13"> Proximity test</label><br />
                  <input type="checkbox" className='mx-2' id="chk14" name="Screw check" value="100" />
                  <label htmlFor="chk14"> Screw check</label><br />
                  <input type="checkbox" className='mx-2' id="chk15" name="Screw check" value="100" />
                  <label htmlFor="chk15"> Sim Tray check</label><br />
                    <input type="submit" value="Submit" className='btn btn-primary' />
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

export default SetEstimate