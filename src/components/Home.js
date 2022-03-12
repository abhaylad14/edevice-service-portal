import React from 'react';
import { Navbar } from "./Navbar"
import { Libraries } from "./Libraries"
import { Footer } from './Footer';

const Home = () => {
  return <>
        <Libraries />
        <Navbar />
        <div className='text-center container-fluid'>
        <img src="./images/bghome.png" width="90%" style={{marginTop: "7%"}} alt="error"></img>
        </div>
        <div className='container'>
        <Footer />
        </div>
  </>;
};

export default Home;