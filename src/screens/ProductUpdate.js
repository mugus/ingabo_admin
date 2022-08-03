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
import LoadingButton from '@mui/lab/LoadingButton';


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
    const [product, setProduct] = useState([]);
    const [pro_name, setPro_name] = useState("")
    const [size, setSize] = useState("");
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



    
    const handleDiscardUpdate = () =>{
        setPro_name("")
        setCategory("")
        setDescription("")
        setSize("")
        setImage("")
    }
    useEffect(() => {
        GetProduct()
    }, []);

    let photo = 'http://localhost:4000/uploads/'+product.image;

// Update Pro details
const handleUpdate = () => {
    const data = new FormData(); 
    data.append("category", category ? category : product.category);
    data.append("name", pro_name ? pro_name : product.name);
    data.append("size", size ? size : product.size);
    data.append("description", description ? description : product.description);
    data.append("image", image ? image : product.image);
    // product_id

    axios.patch(`http://localhost:4000/api/v1/products/${product_id}`, data, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
        // console.log("Updated: ",res);
        window.location.reload()
    }).catch(function (err) {
        if(err.response.data.status===403){
            console.log("Message: ",err.response.data.message);
            // setMsg(err.response.data.message)
            setMsg(err.response.data.message)
            setAlertclass("err")
          }else{
            console.log(err);
          }
            // console.log("Err", err);
    });
}
// End update Pro details



  return (
      <>
        <Grid container >
            <Grid item xl={2} lg={2} md={2}></Grid>
            <Grid item xl={8} lg={8} md={8}>
                <br />
                <br />
            {msg ? 
            <>
                <center>
                    <Alert severity={alertclass} style={{ width: '100%'}}>{msg}</Alert>
                    <br/>
                    <a className='text text-info text-sm' href="../Products">Back on Products</a>
                </center>
            </>
            : 
            <>
            <h2>Update details of {product.name}</h2>

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
                                            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>

                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    Product Name
                                                </Typography>
                                                <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.name}</Typography>

                                            </Grid>
                                            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                                <TextField id="standard-basic" label="Set new Product name" style={{ padding:5, width: '100%' }} variant="standard" value={pro_name} onChange={(e) => setPro_name(e.target.value)} /> 
                                            </Grid>
                                        </Grid>
                                    <hr />
                                    
                                    <Grid container>
                                            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>

                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    Product Sizes
                                                </Typography>
                                                <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.size}</Typography>

                                            </Grid>
                                            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                            <TextField id="standard-basic" label="Product Size" style={{ padding:5, width: '100%' }} variant="standard" value={size} onChange={(e) => setSize(e.target.value)} />
                                            </Grid>
                                        </Grid>
                                    <hr />

                                    <Grid container>
                                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="body2" gutterBottom>Category</Typography>
                                            <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.category}</Typography>
                                        </Grid>
                                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
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
                                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="body2" gutterBottom>Descriptions</Typography>
                                            <Typography variant="body2" color="primary" style={{ paddingLeft: 5, fontWeight: 'bold' }}>{product.description}</Typography>
                                        </Grid>
                                        <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
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
                                        {/* <Grid item id="conf_updates_sm" style={{ display: 'none' }}>
                                            <Typography variant="subtitle1" component="div" style={{ padding:5}}>
                                                <a className='btn btn-success btn-sm CreatePro' onClick={handleUpdate}>Confirm updates</a>
                                            </Typography> <hr/>
                                        </Grid> */}
                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                        <a className='btn btn-success btn-sm CreatePro' onClick={handleUpdate}>Confirm updates</a>
                                        <LoadingButton
                                            loading
                                            loadingPosition="center"
                                            variant="contained"
                                            color="primary"
                                            className='Loading_btn'
                                            >
                                            Tegereza gato
                                        </LoadingButton>
                                        <span>  </span>
                                        <a className='btn btn-danger btn-sm' onClick={handleDiscardUpdate}>Discard changes</a>
                                        <br/><br/>
                                        <a className='text text-info text-sm' href="../Products">Exit update screen</a>
                                        
                                    </Typography>
                                    </Grid>
                                </Grid>
                            {/* <Grid item style={{ padding:10}} id="conf_updates">
                                <Typography variant="subtitle1" component="div" style={{ padding:5}}>
                                    <a className='btn btn-success btn-sm CreatePro' onClick={handleUpdate}>Confirm updates</a>
                                </Typography>
                            </Grid> */}
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