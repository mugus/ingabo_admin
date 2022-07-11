import React, {useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import $ from 'jquery';
import axios from 'axios';

$(document).ready(function(){
    $('.signup_btn').show()
    $('.Loading_btn').hide()
  })
const Signup = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [names, setNames] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email_id, setEmail_id] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        $(document).ready(function(){
            $('.signup_btn').hide()
            $('.Loading_btn').show()
        })

        setNames(`${fname} ${lname}`);
        const data = {
            names: names,
            phone:phone,
            address:address,
            email_id:email_id,
            password:password
        };
        // data.append("names", names);
        // data.append("phone", phone);
        // data.append("address", address);
        // data.append("email_id", email_id);
        // data.append("password", password);

    axios.post('http://localhost:4000/api/v1/auth/user', data)
    .then(res => {
      if(res.status===201){
        console.log(res);
        // setMsg(res.message)
        // setAlertclass("success")
      }else if(res.status===400){
        console.log(res);
        // setMsg(res.message)
        // setAlertclass("error")
      }else{
        console.log(res)
      }
      // console.log('Axios response: ', res)
    }).catch(function (error) {
        console.log("Error: ",error);
    })

        // console.log("Sign up ready");
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
          >
          </IconButton>
        </React.Fragment>
      );
      const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      


    return (
        <>
        <Grid container>
          <div>
            <Snackbar
              color='danger'
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={message}
              action={action}
            />
          </div>
              <Grid container style={{paddingTop: '5%', paddingLeft: '4%'}}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
                <Grid item xs={12} sm={7} md={6} lg={7} xl={5}>
                  <Grid container>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
                  <Grid item xs={12} sm={7} md={6} lg={7} xl={5}>
                    <Typography gutterBottom variant="h5" component="div" color='primary'>
                      SIGN UP
                    </Typography>
                  </Grid>
                  </Grid>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '80%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField color="primary" id="standard-basic" label="Lastname" type="text" variant="standard" value={lname} onChange={(e) => setLname(e.target.value)} />

                    <TextField color="primary" id="standard-basic" label="Firstname" type="text" variant="standard" value={fname} onChange={(e) => setFname(e.target.value)} />


                    <TextField color="primary" id="standard-basic" label="Phone" type="text" variant="standard" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <TextField color="primary" id="standard-basic" label="Email" type="email" variant="standard" value={email_id} onChange={(e) => setEmail_id(e.target.value)} />
                    <TextField color="primary" id="standard-basic" label="Address" type="text" variant="standard" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <TextField color="primary" id="standard-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
                    <Button variant="contained" color="primary" className='signup_btn' onClick={handleSignup}>
                      Register
                    </Button>
                    <LoadingButton
                        loading
                        loadingPosition="center"
                        variant="contained"
                        color="primary"
                        className='Loading_btn'
                      >
                        Wait
                      </LoadingButton>
                  </Box>
                    <Typography style={{paddingTop: '3%', paddingLeft: '1%'}}>
                      <Button href="./" color='secondary'>
                        Login
                      </Button>
                      
                    </Typography>
                </Grid>
  
              </Grid>
  
        </Grid>
          
        </>
    );
}
export default Signup;