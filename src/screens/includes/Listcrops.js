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
    const [isReady, setisready] = useState(false);
    
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
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>

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
                                    <Button variant="outlined" size="small" onClick={()=> alert('Modal ready')}>View More</Button>
                                </CardActions>
                            </Card>

                        </Grid>
                    )
                })
            }

            </Grid>
            ) : (
                <CircularProgress />
            )
        }
        </>
    )
}