import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useConfirm } from "material-ui-confirm";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import $ from 'jquery';

export default function Listcrops() {
    const confirm = useConfirm();
    const [image, setImage] = useState("");
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('language');
    const [cropkin, setCropkin] = useState([]);
    const [cropeng, setCropeng] = useState([]);
    const [crop_modal, setCrop_modal] = useState("");
    
    const [crop_name, setCrop_name] = useState("");
    const [isReady, setisready] = useState(false);
    

    $(document).ready(function(){
        $('.CreatePro').show()
        $('.Loading_btn').hide()
      })
      $(document).ready(function(){
        $('.CreateProImg').show()
        $('.Loading_btnImg').hide()
    })

    const handleDiagnosis=(crop_id)=>{
        // alert("crop_id: "+crop_id);
        const items = localStorage.getItem('token');
        window.location.replace(`./Diagnosis/${items}/${crop_id}`)
    }
    // console.log("Diagnosis: ", diagnosisdetails);

        // Delete product
        const handleDelete = crop_id => {
            confirm({ description: `You are going to permanently delete` })
              .then(() => {
                // console.log("Ready");
                    axios.delete(`http://197.243.14.102:4000/api/v1/crops/${crop_id}`, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
                    alert("Deleted ")
                    window.location.reload()
                }).catch(err=>{
                    if(err.response.data.status===403){
                    console.log("Message: ",err.response.data.message);
                    alert(err.response.data.message);
                    // setMsg(err.response.data.message)
                    // setMsg(err.response.data.message)
                    // setAlertclass("err")
                    }else{
                    console.log(err);
                    }
                        // console.log(err);
                })
              }
              )
              .catch(() => console.log("Deletion cancelled."));
          };


          const getKinyaCrops = () => {
            axios.get('http://197.243.14.102:4000/api/v1/crops/kin').then(res => {
                setCropkin(res.data.crops);
                // setLang(language)
                cropkin ? setisready(true) : setisready(false)
                    // console.log("Kinya crops");
                    // console.log("crops", res.data.crops);
                }).catch(err=>{
                    console.log(err);
                })
        }
        const getEngCrops = () => {
            axios.get('http://197.243.14.102:4000/api/v1/crops/en').then(res => {
                setCropeng(res.data.crops);
                // setLang(language)
                cropeng ? setisready(true) : setisready(false)
                    // console.log("crops English");
                    // console.log("crops", res.data.crops);
                }).catch(err=>{
                    console.log(err);
                })
        }



    useEffect(()=> {
            getKinyaCrops()
            getEngCrops()
      }, [])


    // Get modal content
    $(document).on('click', '.view_data', function(e){
        e.preventDefault();
        var crop_id = $(this).data('id');
        GetCropName(crop_id);
    });
    const GetCropName =(crop_id)=>{
        axios.get(`http://197.243.14.102:4000/api/v1/crops/single/${crop_id}`).then(res => {
              setCrop_modal(res.data.crop)
          }).catch(err=>{
            if(err.response.data.status === 404){
              alert(err.response.data.message);
              console.log(err.response.data.message);
            }else{
              console.log(err);
            }
          })
    }
    // End Get modal content

// Update crop name
const EditCropName =()=>{
    $(document).ready(function(){
        $('.CreatePro').hide()
        $('.Loading_btn').show()
    })
    let data = {
        name: crop_name
    }

    axios.put(`http://197.243.14.102:4000/api/v1/crops/${crop_modal.crop_id}`,data, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
        window.location.reload()
    }).catch(err=>{
      if(err.response.data.status === 404){
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }else{
        console.log(err.response);
      }
    })
}

// Update crop image
const EditCropImage =()=>{
    $(document).ready(function(){
        $('.CreateProImg').hide()
        $('.Loading_btnImg').show()
    })
    let data = new FormData();
    data.append("image", image);
 

    axios.put(`http://197.243.14.102:4000/api/v1/crops/profile/${crop_modal.crop_id}`,data, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
        window.location.reload()
    }).catch(err=>{
      if(err.response.data.status === 404){
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }else{
        console.log(err.response);
      }
    })
}

let photo = 'http://197.243.14.102:4000/uploads/'+crop_modal.image;
    return (
        <>
        {
            isReady ? (
            <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
                {
                language == 1 ? 
                <>
                {
                    cropkin.map((crop)=>{
                        let photo = 'http://197.243.14.102:4000/uploads/'+crop.image;
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={crop.crop_id}>

                                <Card sx={{ width: '100%' }}>
                                    <CardMedia
                                    component="img"
                                    height="300"
                                    image={photo}
                                    alt={crop.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {crop.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>

                                        <ButtonGroup size="small" aria-label="small button group">
                                            <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5cb85c' }} value={crop.crop_id} onClick={e => handleDiagnosis(e.target.value)}>
                                                Reba indwara
                                            </Button>
                                            <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} className="view_data" data-bs-toggle="modal" href="#exampleModalToggle" data-id={crop.crop_id}>
                                                Hindura
                                            </Button>
                                            {/* <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#f0ad4e' }} value={product.product_id} onClick={handleDelete(product)}>Delete</Button> */}
                                            <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#f0ad4e' }} value={crop.crop_id} onClick={e => handleDelete(e.target.value)}>
                                                Siba
                                            </Button>
                                        </ButtonGroup>

                                    </CardActions>
                                </Card>

                            </Grid>
                        )
                    })
                }
                </>
                :
                    <>
                    {
                        cropeng.map((crop)=>{
                            let photo = 'http://197.243.14.102:4000/uploads/'+crop.image;
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={crop.crop_id}>

                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia
                                        component="img"
                                        height="300"
                                        image={photo}
                                        alt={crop.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {crop.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>

                                            <ButtonGroup size="small" aria-label="small button group">
                                                <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5cb85c' }} value={crop.crop_id} onClick={e => handleDiagnosis(e.target.value)}>
                                                    View Diagnosis
                                                </Button>
                                                <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} className="view_data" data-bs-toggle="modal" href="#exampleModalToggle" data-id={crop.crop_id}>
                                                    Edit
                                                </Button>
                                                {/* <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#f0ad4e' }} value={product.product_id} onClick={handleDelete(product)}>Delete</Button> */}
                                                <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#f0ad4e' }} value={crop.crop_id} onClick={e => handleDelete(e.target.value)}>
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </CardActions>
                                    </Card>

                                </Grid>
                            )
                        })
                    }
                    </>
                }
            
            
            </Grid>
            ) : (
                <Grid container >
                    <Grid item xl={12}>
                        <center>
                            <CircularProgress />
                        </center>
                    </Grid>

                </Grid>
            )
        }



<div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
  <div className="modal-dialog modal-md">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel">Crop Name: <span className='text-muted'>{crop_modal.name}</span> </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className='container'>


            <div className='row'>
                <div className='col-md-5'>
                    <div className="form-group">
                        <div style={{ width: 170, height: 200 }}>
                            <img src={photo} alt='crop image' width='170' height='200'/>
                        </div>
                            <br/>
                            <input type='file' onChange={e => { const image = e.target.files[0]; setImage(image) }}/>
                    </div><br/>
                    <div className="form-group">
                        <button className="btn btn-success btn-sm btn-block CreateProImg" style={{ width: '100%' }} onClick={EditCropImage}>Update image</button>
                        <LoadingButton
                              loading
                              loadingPosition="center"
                              variant="contained"
                              color="primary"
                              style={{ width: '100%' }} 
                              className='Loading_btnImg'
                            >
                              Wait
                            </LoadingButton>
                    </div>
                    
                </div>

                <div className='col-md-7'>
                    <div className="form-group">
                        <TextField id="standard-basic" label="Add New name" variant="standard" value={crop_name} onChange={(e) => setCrop_name(e.target.value)} style={{ width: '100%' }} />
                        {/* <input type="hidden" className="form-control" value={crop_modal.crop_id} placeholder="Change name" onChange={(e) => setCrop_id(e.target.value)}/> */}
                    </div><br/>
                    <div className="form-group">
                        <button className="btn btn-success btn-sm btn-block CreatePro" style={{ width: '100%' }} onClick={EditCropName}>Update name</button>
                        <LoadingButton
                              loading
                              loadingPosition="center"
                              variant="contained"
                              color="primary"
                              style={{ width: '100%' }} 
                              className='Loading_btn'
                            >
                              Wait
                            </LoadingButton>
                    </div>
                </div>
            </div>

          

        </div>



      </div>
    </div>
  </div>
</div>



        </>
    )
}