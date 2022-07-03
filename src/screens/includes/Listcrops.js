import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from 'axios';


export default function Listcrops() {

    const [crop, setCrop] = useState([]);
    const [diagnosisdetails, setDiagnosisdetails] = useState([]);
    const [isReady, setisready] = useState(false);
    
    const handleDiagnosis=(crop_id)=>{
        // alert("crop_id: "+crop_id);
        axios.get(`http://197.243.14.102:4000/api/v1/crops/${crop_id}`).then(res => {
            setDiagnosisdetails(res.data.diag);
        }).catch(err=>{
            console.log(err);
        })
    }
    console.log("Diagnosis: ", diagnosisdetails);

    useEffect(()=> {
        axios.get('http://197.243.14.102:4000/api/v1/crops').then(res => {
            setCrop(res.data.crops);
        }).catch(err=>{
            console.log(err);
        })
        crop ? setisready(true) : setisready(false)
      }, [])

      console.log("Data: ",crop);
    return (
        <>
        {
            isReady ? (
            <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
            {
                crop.map((crop)=>{
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
                                    
                                    <Button variant="outlined" size="small" color="warning">Edit</Button>
                                    <Button value={crop.crop_id} variant="outlined" size="small" onClick={e => handleDiagnosis(e.target.value)}>View Diagnosis</Button>
                                </CardActions>
                            </Card>

                        </Grid>
                    )
                })
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