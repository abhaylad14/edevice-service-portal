import React from 'react';
import { Navbar } from "./Navbar"
import { Footer } from './Footer';

const Home = () => {
  return <>
        <Navbar />
        <div className='text-center container-fluid'>
        <img src="./images/bghome.png" width="80%" style={{marginTop: "7%"}} alt="error"></img>
        </div>
        <div className='container'>
        <Footer />
        </div>
  </>;
};

export default Home;