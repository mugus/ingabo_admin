import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useConfirm } from "material-ui-confirm";
import axios from 'axios';


export default function Listcrops() {
    const confirm = useConfirm();
    const [crop, setCrop] = useState([]);
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('language');
    const [cropkin, setCropkin] = useState([]);
    const [cropeng, setCropeng] = useState([]);
    // const [lang, setLang] = useState("");
    
    // const [diagnosisdetails, setDiagnosisdetails] = useState([]);
    const [isReady, setisready] = useState(false);
    
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
                    console.log("Kinya crops");
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
                    console.log("crops English");
                    // console.log("crops", res.data.crops);
                }).catch(err=>{
                    console.log(err);
                })
        }



    useEffect(()=> {
            getKinyaCrops()
            getEngCrops()

        // axios.get('http://197.243.14.102:4000/api/v1/crops').then(res => {
        //     setCrop(res.data.crops);
        // }).catch(err=>{
        //     console.log(err);
        // })
        // crop ? setisready(true) : setisready(false)
      }, [])

      console.log("Data: ",language);
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
                                                View Diagnosis
                                            </Button>
                                            <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} value={crop.crop_id}>
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
                                                <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} value={crop.crop_id}>
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
        </>
    )
}