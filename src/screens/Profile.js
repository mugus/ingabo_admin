import React from "react";
import '../styles/Landing.css';
import Navbar from './Navbar';
import Button from '@mui/material/Button';


export default function Profile() {
  return (
      <>
        <div className="Profile">
          <Navbar />
          <h2>Ingabo Profile Dashboard Management Screen</h2>
          <Button color="primary">Products</Button>
        </div>
      </>
  );
}