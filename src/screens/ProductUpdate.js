import React, { useState, useEffect } from 'react';
import '../styles/Landing.css';
import Navbar from './Navbar';
import Card from '@mui/material/Card';
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import axios from 'axios';
import $ from 'jquery'; 
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function ProductUpdate() {
    const { product_id } = useParams();
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('language');
    const [pro_name, setPro_name] = useState("")
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [msg, setMsg] = useState("");
    const [alertclass, setAlertclass] = useState("");

    $(document).ready(function(){
        $('.CreatePro').show()
        $('.Loading_btn').hide()
      })
    // get Product
    const GetProduct = () => {
        axios.get(`http://localhost:4000/api/v1/products/${product_id}`).then(res => {
        setProduct(res.data.product);
    }).catch(err=>{
        console.log(err.response.data.message);
        if(err.response.data.status === 404){
            setMsg(err.response.data.message)
            setAlertclass("error")
          }else{
            console.log('Err ', err);
          }
    })
    }
    // end Get Product


    const handleUpdate = () => {
        alert("Ready")
    }
    
    const handleDiscardUpdate = () =>{
        setPro_name("")
        setCategory("")
        setDescription("")
        setImage("")
    }
    useEffect(() => {
        GetProduct()
    }, []);

    let photo = 'http://localhost:4000/uploads/'+product.image;
    console.log("Pro: ", product.name);
    
  return (
      <>
        <Grid container >
            <Grid item xl={2} lg={2} md={2}></Grid>
            <Grid item xl={8} lg={8} md={8}>
                <br />
                <br />
            {msg ? <Alert severity={alertclass}>{msg}</Alert>: 
            <>
            <h2>Update Product details of {product.name}</h2>

            
            
            {/* <input value={product.name} type="text"/>
                <h2>Ingabo ProductUpdate Dashboard Management Screen Id {product.name}</h2><br /> */}

                        {/* <small className='text-muted'>
                            Current Product name:
                        </small><br />
                        <small className='text-primary'>{product.name}</small><hr />
                        
                    */}
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: '100%',
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                        >
                        <Grid container spacing={2}>
                            <Grid item>
                            <ButtonBase sx={{ width: 200, height: 230 }}>
                                <Img alt="complex" src={photo} width='150' height='200' />
                            </ButtonBase>
                                <br/>
                                <Typography gutterBottom variant="subtitle1" component="div" color="primary">
                                    Change Image
                                </Typography>
                                <input type="file" name="image" label="file" onChange={e => {const image = e.target.files[0]; setImage(image) }} required/>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>

                                        <Grid container>
                                            <Grid item xl={6} lg={12} md={12} sm={12}>

                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    Product Name
                                                </Typography>
                                                <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.name}</Typography>

                                            </Grid>
                                            <Grid item xl={6} lg={12} md={12} sm={12}>
                                                <TextField id="standard-basic" label="Set new Product name" style={{ padding:5, width: '100%' }} variant="standard" value={pro_name} onChange={(e) => setPro_name(e.target.value)} /> 
                                            </Grid>
                                        </Grid>
                                    <hr />
                                    
                                    <Grid container>
                                        <Grid item xl={6} lg={12} md={12} sm={12}>
                                            <Typography variant="body2" gutterBottom>Category</Typography>
                                            <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.category}</Typography>
                                        </Grid>
                                        <Grid item xl={6} lg={12} md={12} sm={12}>
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{ padding:5, width: '100%' }}>
                                                <InputLabel id="demo-simple-select-standard-label">Set New category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    label="Product Category"
                                                >
                                                    <MenuItem value="Fungicide">Fungicide</MenuItem>
                                                    <MenuItem value="Pesticide">Pesticide</MenuItem>
                                                    <MenuItem value="Fertilizer">Fertilizer</MenuItem>
                                                    <MenuItem value="Seed Coating">Seed Coating</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container>
                                        <Grid item xl={6} lg={12} md={12} sm={12}>
                                            <Typography variant="body2" gutterBottom>Descriptions</Typography>
                                            <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.description}</Typography>
                                        </Grid>
                                        <Grid item xl={6} lg={12} md={12} sm={12}>
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Set new desc"
                                                multiline
                                                rows={3}
                                                style={{ padding:5, width: '100%' }}
                                                variant="standard"
                                                value={description} onChange={(e) => setDescription(e.target.value)} 
                                            /> 
                                        </Grid>
                                    </Grid>

                                    
                                    <hr />

                                    </Grid>
                                    <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                        <a className='btn btn-danger btn-sm' onClick={handleDiscardUpdate}>Discard changes</a><br/><br/>
                                        <a className='text text-info text-sm' href="">Exit update screen</a>
                                        
                                    </Typography>
                                    </Grid>
                                </Grid>
                            <Grid item style={{ padding:10}}>
                                <Typography variant="subtitle1" component="div" style={{ padding:5}}>
                                    <a className='btn btn-success btn-sm CreatePro' onClick={handleUpdate}>Confirm updates</a>
                                </Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
    
            </>
            }




            </Grid>
        </Grid>


      </>
  );
}