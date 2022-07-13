import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import $ from 'jquery'; 
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
};
  
export default function ProductUsage() {
    const token = localStorage.getItem('token');
    const [product, setProduct] = useState([]);
    const [application, setApplication] = useState("");
    const [pre_condition, setPre_condition] = useState("");
    const [msg, setMsg] = useState("");
    const [alertclass, setAlertclass] = useState("");
    const { product_id } = useParams();
    $(document).ready(function(){
        $('.CreatePro').show()
        $('.Loading_btn').hide()
      })
      
    const handleCreateUsage = () => {
        const data = {
            product_id:product_id,
            application: application,
            pre_condition: pre_condition
        }
        // http://197.243.14.102:4000/api/v1/products/details
        axios.post('http://localhost:4000/api/v1/products/details', data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            alert(res.message);
          console.log('Axios response: ', res)
        }).catch(function (err) {
            if(err.response.data.status === 403){
                alert(err.response.data.message);
                // console.log(err.response.data.message);
            }if(err.response.data.status === 404){
                alert(err.response.data.message);
            }else{
                console.log(err);
            }
        });
    }

    const handleUpdateUsage = () => {
        console.log('Application ',application);
        console.log('Pre_condition ',pre_condition);
    }

    
    useEffect(() => {
        // get Product
        axios.get(`http://localhost:4000/api/v1/products/${product_id}`).then(res => {
            setProduct(res.data.product);
        }).catch(err=>{
            if(err.response.data.status === 404){
                setMsg(err.response.data.message)
                setAlertclass("error")
                // alert(err.response.data.message);
                // console.log(err.response.data.message);
              }else{
                console.log(err);
              }
            // console.log(err);
        })
        // end Get Product



    }, []);

    


  return (
      <>
          {/* <Navbar /> */}
          <Grid container style={{ paddingTop: 20 }}>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={8} lg={8} md={8}>
                <Grid container style={{ paddingTop: 20 }}>
                    <Grid item xl={7} lg={8} md={8} sm={8} xs={12}>
                        <div style={{ paddingLeft: 40,paddingTop: 20 }}>
                            {msg ? 
                                <Alert severity={alertclass}>{msg}</Alert> : 
                                <>
                                    <h3>{product.name} Details</h3>
                                    <small>Category: {product.category}</small>
                                    <Button color="primary" href='../Products'>Products</Button>
                                </>
                            }
                        </div>
                    </Grid>
                    <Grid item xl={5} lg={4} md={4} sm={4} xs={12} style={{ paddingLeft: 20}}>
                        <h2> {msg ? (<span>New</span>) : (<span>Update</span>)} Product Usage</h2>
                            {
                                msg ? (
                                    <>
                                            <Box
                                                component="form"
                                                sx={{
                                                '& > :not(style)': { m: 1, width: '100%' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                >
                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="Product Pre-Condition(Description)"
                                                    multiline
                                                    rows={3}
                                                    variant="standard"
                                                    value={pre_condition}
                                                    onChange={e => setPre_condition(e.target.value)}
                                                />

                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="Product Application(Description)"
                                                    multiline
                                                    rows={3}
                                                    variant="standard"
                                                    value={application}
                                                    onChange={e => setApplication(e.target.value)} 
                                                />  
                                                
                                            
                                                <Button className="CreatePro" variant="contained" color="success" onClick={handleCreateUsage}>Create</Button>
                                                
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

                                    </>
                                ) : (
                                    <>
                                     
                                            <Box
                                                component="form"
                                                sx={{
                                                '& > :not(style)': { m: 1, width: '100%' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                >
                                                <TextField
                                                    value={pre_condition}
                                                    id="standard-multiline-static"
                                                    label="Set New Product Pre-Condition"
                                                    multiline
                                                    rows={3}
                                                    variant="standard"
                                                    onChange={e => setPre_condition(e.target.value)} 
                                                />
                                                <TextField
                                                value={application}
                                                id="standard-multiline-static"
                                                label="Set New Product Application"
                                                multiline
                                                rows={3}
                                                variant="standard"
                                                onChange={e => setApplication(e.target.value)} 
                                            />    
                                                
                                            
                                                <Button className="CreatePro" variant="contained" color="success" onClick={handleUpdateUsage}>Update</Button>
                                                
                                                <LoadingButton
                                                loading
                                                loadingPosition="center"
                                                variant="contained"
                                                color="primary"
                                                className='Loading_btn'
                                                >Wait</LoadingButton>
                                            </Box>
                                    </>
                                )
                            } 

                        <Button color="primary" href='../Products'>Products list</Button>
                    </Grid>
                </Grid>
                
            </Grid>
          </Grid>

      </>
  );
}