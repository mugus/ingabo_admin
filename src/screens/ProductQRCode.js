import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import $ from 'jquery'; 
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';



export default function ProductQRCode() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [msg, setMsg] = useState("");
    const [alertclass, setAlertclass] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [content, setContent] = useState("");

    $(document).ready(function(){
        $('.CreatePro').show()
        $('.Loading_btn').hide()
      })

    const handleAddContent = () => {
        if(content === '' || name === ''){
            setMsg('Content and Name is required')
            setAlertclass("error")
        // console.log("Content and Name is required")
        }else{
            $(document).ready(function(){
                $('.CreatePro').hide()
                $('.Loading_btn').show()
            })

            const data = {
                name:name,
                country:country,
                email:email,
                phone:phone,
                content:content,
            };

    
            axios.post(`http://197.243.14.102:4000/api/v1/products/qr_code/${id}`, data)
            .then(res => {
                setName("")
                setCountry("")
                setEmail("")
                setPhone("")
                setContent("")
                setMsg(res.data.message)
                setAlertclass("success")
            }).catch(function (error) {
                if(error.response.data.status===400){
                  console.log("Message: ",error.response.data.message);
                  setMsg(error.response.data.message)
                  setAlertclass("error")
                }else{
                  console.log(error);
                }
            });
            // http://localhost:4000/api/v1/products/qr_code/1

        }
      

        // alert('ready')
    }


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


    return (
        <>
            <Grid container>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={12}></Grid>
                <Grid item xl={4} lg={5} md={6} sm={6} xs={12}>

                <div style={{padding: 10 }}>
                            
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


                                    <hr />
                                    <Grid container>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography  style={{paddingLeft: '30%', fontWeight: 'bold' }} color='primary' variant="h5">
                                                FEEDBACK
                                            </Typography>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                    '& > :not(style)': { m: 1, width: '80%' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    {msg ? <><Alert severity={alertclass}>{msg}</Alert> <br /></> : <></> }
                                                        <TextField id="standard-basic" label="Name" variant="standard" type='text'  value={name} onChange={(e) => setName(e.target.value)}/>
                                                        <TextField id="standard-basic" label="Country" variant="standard" type='text'  value={country} onChange={(e) => setCountry(e.target.value)}/>
                                                        <TextField id="standard-basic" label="Email" variant="standard" type='email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                        <TextField id="standard-basic" label="Telophone Number" type='number' variant="standard"  value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                                        <TextField
                                                            id="standard-multiline-static"
                                                            label="Content (Message)"
                                                            multiline
                                                            rows={3}
                                                            variant="standard"
                                                            value={content} onChange={(e) => setContent(e.target.value)}
                                                        />
                                                        <Button className="CreatePro" variant="contained" color="success" onClick={handleAddContent}>
                                                            Submit
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
                                        </Grid>

                                    </Grid>
                                    
                                </div>
                           
                        </div>



                    
                </Grid>
            </Grid>
        </>
    )
}