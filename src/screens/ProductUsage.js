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
    const { product_id } = useParams();
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('language');
    const [product, setProduct] = useState([]);
    const [application, setApplication] = useState("");
    const [pre_condition, setPre_condition] = useState("");
    const [msg, setMsg] = useState("");
    const [alertclass, setAlertclass] = useState("");

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
        axios.post('http://197.243.14.102:4000/api/v1/products/details', data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if(res.status === 201){
                window.location.reload()
            }else{
                console.log('Axios response: ', res)
            }
            
        //   console.log('Axios response: ', res)
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
        // http://197.243.14.102:4000/api/v1/products/details/:id
        const data = {
            product_id: product_id,
            application: application ? application : product.application,
            pre_condition: pre_condition ? pre_condition : product.pre_condition
        }
        axios.patch(`http://197.243.14.102:4000/api/v1/products/details/${product_id}`, data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            window.location.reload()
        }).catch(function (err) {
                console.log("Err", err);
        });
    }

    
    useEffect(() => {
        // get Product
        axios.get(`http://197.243.14.102:4000/api/v1/products/${product_id}`).then(res => {
            setProduct(res.data.product);
        }).catch(err=>{
            if(err.response.data.status === 404){
                setMsg(err.response.data.message)
                setAlertclass("error")
              }else{
                console.log('Err ', err);
              }
        })
        // end Get Product



    }, []);

    let photo = 'http://197.243.14.102:4000/uploads/'+product.image;

  return (
      <>
          {/* <Navbar /> */}
          <Grid container style={{ paddingTop: 20 }}>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={10} lg={10} md={10}>
                {language == 1 ?
                    <Grid container style={{ paddingTop: 20 }}>
                    <Grid item xl={7} lg={8} md={8} sm={8} xs={12}>
                        <div style={{ paddingLeft: 40,paddingTop: 20 }}>
                            {msg ? 
                                <>
                                <Alert severity={alertclass}>{msg}</Alert> <br />
                                <Alert severity="info"><small>Product will be ready for users until Application and Pre condition added to product details</small></Alert>
                                
                                </> : 
                                <>
                                    <h3>{product.name}</h3>
                                    <Typography color='primary' variant="p">{product.category}</Typography>
                                    <hr />
                                    <Typography color='secondary' variant="h6">Sizes</Typography>
                                    <Typography color='primary' variant="p">{product.size}</Typography>
                                    
                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Ubusobanuro</Typography>
                                    <Typography color='primary' variant="p">{product.description}</Typography>

                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Itondere ibi mbere</Typography>
                                    <Typography color='primary' variant="p">{product.pre_condition}</Typography>

                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Uko ukoreshwa</Typography>
                                    <Typography color='primary' variant="p">{product.application}</Typography>

                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Amafoto</Typography>
                                    <img src={photo} width='150' height='200' />
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
                                                '& > :not(style)': { m: 1, width: '95%' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                >
                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="Andika ibyo kwitondera mbere(Ibindi)"
                                                    multiline
                                                    rows={3}
                                                    variant="standard"
                                                    value={pre_condition}
                                                    onChange={e => setPre_condition(e.target.value)}
                                                />

                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="Andika uko umuti ukoreshwa(Ibindi)"
                                                    multiline
                                                    rows={3}
                                                    variant="standard"
                                                    // value={application}
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
                                                '& > :not(style)': { m: 1, width: '95%' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                >
                                                <TextField
                                                    value={pre_condition}
                                                    id="standard-multiline-static"
                                                    label="Kosora ibyo kwitondera mbere"
                                                    multiline
                                                    rows={3}
                                                    variant="standard"
                                                    onChange={e => setPre_condition(e.target.value)} 
                                                />
                                                <TextField
                                                value={application}
                                                id="standard-multiline-static"
                                                label="Kosora uko umuti ukoreshwa"
                                                multiline
                                                rows={3}
                                                variant="standard"
                                                onChange={e => setApplication(e.target.value)} 
                                            />    
                                                
                                            
                                                <Button className="CreatePro" variant="contained" color="success" onClick={handleUpdateUsage}>Emeza</Button>
                                                
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
                :
                <Grid container style={{ paddingTop: 20 }}>
                    <Grid item xl={7} lg={8} md={8} sm={8} xs={12}>
                        <div style={{ paddingLeft: 40,paddingTop: 20 }}>
                            {msg ? 
                                <>
                                <Alert severity={alertclass}>{msg}</Alert> <br />
                                <Alert severity="info"><small>Product will be ready for users until Application and Pre condition added to product details</small></Alert>
                                
                                </> : 
                                <>
                                    <h3>{product.name}</h3>
                                    <Typography color='primary' variant="p">{product.category}</Typography>
                                    <hr />
                                    <Typography color='secondary' variant="h6">Sizes</Typography>
                                    <Typography color='primary' variant="p">{product.size}</Typography>
                                    
                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Description</Typography>
                                    <Typography color='primary' variant="p">{product.description}</Typography>

                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Pre Condition</Typography>
                                    <Typography color='primary' variant="p">{product.pre_condition}</Typography>

                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Application</Typography>
                                    <Typography color='primary' variant="p">{product.application}</Typography>

                                    <Typography color='secondary' variant="h6" style={{ paddingTop: 10 }}>Images</Typography>
                                    <img src={photo} width='150' height='200' />
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
                                                '& > :not(style)': { m: 1, width: '95%' },
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
                                                    // value={application}
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
                                                '& > :not(style)': { m: 1, width: '95%' },
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
                }
                
                
            </Grid>
          </Grid>

      </>
  );
}