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


export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [password, setPassword] = useState("");
  
  $(document).ready(function(){
    $('.Login_btn').show()
    $('.Loading_btn').hide()
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    $(document).ready(function(){
      $('.Login_btn').hide()
      $('.Loading_btn').show()
    })
    await fetch('http://197.243.14.102:4000/api/v1/auth/login',{
    // await fetch('http://197.243.14.102:4000/api/v1/auth/login',{
      method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email_id:email_id,
          password:password
        })
    }).then((response)=>response.json())
    .then((res)=>{
      // console.log("Message: ", res.loggedin_user_id);
      if(res.status===200){
        localStorage.setItem('token',res.token);
        localStorage.setItem('user',res.loggedin_user_id);
        window.location.replace('./Home');
      } else{
        // alert("Invalid Credentials");
        // console.log("Message: ", res.message);
        setOpen(true);
        setmessage(res.message);
      }
    });


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
            <Grid container style={{paddingTop: '10%', paddingLeft: '4%'}}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
              <Grid item xs={12} sm={7} md={6} lg={7} xl={5}>
                <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
                <Grid item xs={12} sm={7} md={6} lg={7} xl={5}>
                  <Typography gutterBottom variant="h5" component="div" color='primary'>
                    SIGN IN
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
                  <TextField color="primary" id="standard-basic" label="Email" type="email" variant="standard" value={email_id} onChange={(e) => setEmail_id(e.target.value)} />
                  <TextField color="primary" id="standard-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    
                  <Button variant="contained" color="primary" className='Login_btn' onClick={handleLogin}>
                    Login
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
                    <Button href="/Signup" color='secondary'>
                      New Account?
                    </Button>
                    
                  </Typography>
              </Grid>

            </Grid>

      </Grid>
        
      </>
  );
}