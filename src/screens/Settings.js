import React from "react";
import '../styles/Landing.css';
import Navbar from './Navbar';
import Button from '@mui/material/Button';


export default function Settings() {
  return (
      <>
          <Navbar />
          <h2>Ingabo Settings Dashboard Management Screen</h2>
          <Button variant="contained" color="secondary">Products</Button>
      </>
  );
}