import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import $ from 'jquery'; 
import Alert from '@mui/material/Alert';




export default function ProductQRCode() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [msg, setMsg] = useState("");
    const [alertclass, setAlertclass] = useState("");

    useEffect(() => {
        // get Product
        axios.get(`http://197.243.14.102:4000/api/v1/products/qr_code/${id}`).then(res => {
            setProduct(res.data.product);
        }).catch(err=>{
            // if(err.response.data.status == 404){
                setMsg(err.response.data.message)
                setAlertclass("error")
            //   }else{
            //     console.log('Err ', err);
            //   }
        })
        // end Get Product



    }, []);

console.log("product: ",product);

    return (
        <>
            <Grid container style={{ paddingTop: 20 }}>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={12}></Grid>
                <Grid item xl={4} lg={5} md={6} sm={6} xs={12}>

                <div style={{padding: 20 }}>
                            {msg ? 
                                <>
                                <Alert severity={alertclass}>{msg}</Alert> <br />
                                <Alert severity="info"><small>Product will be ready for users until Application and Pre condition added to product details</small></Alert>
                                
                                </> : 
                                <div style={{padding: 20 }}>
                                    <h1 style={{fontSize: 42, fontWeight: 'bold'}}>{product.product_name}</h1>
                                    <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.category}</Typography>
                                    <hr />
                                    <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">Active Ingredient</Typography>
                                    <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.active_ingredient}</Typography>

                                    <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">Batch Number</Typography>
                                    <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.batch_number}</Typography>
                                    
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">MFD Date</Typography>
                                            <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.mfd_date}</Typography>
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">EXP Date</Typography>
                                            <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.exp_date}</Typography>
                                        </Grid>

                                    </Grid>

                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">Importer</Typography>
                                            <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.importer}</Typography>
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">Manufacturer</Typography>
                                            <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.manufacturer}</Typography>
                                        </Grid>

                                    </Grid>

                                    <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">Telephone</Typography>
                                    <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.telephone}</Typography>

                                    <Typography  style={{paddingTop: 20, fontWeight: 'bold' }} color='secondary' variant="h6">Email</Typography>
                                    <Typography color='primary' variant="p"  style={{fontSize: 16,paddingLeft: 5 , fontWeight: 'bold'}}>{product.email}</Typography>


                                    
                                </div>
                            }
                        </div>



                    
                </Grid>
            </Grid>
        </>
    )
}