import React, {useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from "@mui/material";
import axios from 'axios';


export default function Home() {
  const [user, setUser] = useState({});
  const [is_loggedin, setIs_loggedin] = useState(false);

  const HandleLogout = async() => {
    localStorage.clear();
    window.location.replace('./');
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token === null) {
        window.location.replace('./')
    }else{
        console.log("Token true: ", token);


      axios.get('http://197.243.14.102:4000/api/v1/auth/user/'+user).then(res => {
        setUser(res.data);
        setIs_loggedin(true);
        console.log("User: ", res.data);
      }).catch(err=>{
          console.log(err);
      })  
    }
  }, []);

console.log("Log: ",is_loggedin);
  return (
      <>
      <Grid container>
      {/* {is_loggedin ? ( */}
        <>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Navbar />
        </Grid>
        <Grid container style={{paddingTop: '10%', paddingLeft: '4%'}}>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <h3>Welcome {user.names}</h3>
            <p>You can navigate as you wish</p>
            <Button onClick={HandleLogout} href="#">Logout</Button>
          </Grid>
        </Grid>
      </>

 

      </Grid>
        
      </>
  );
}