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

export default function ListProducts() {

    const [product, setProduct] = useState([]);
    const [isReady, setisready] = useState(false);
    
    useEffect(()=> {
        axios.get('http://localhost:4000/api/v1/products').then(res => {
        // axios.get('http://197.243.14.102:4000/api/v1/products').then(res => {
          setProduct(res.data.products);
        }).catch(err=>{
            console.log(err);
        })
        product ? setisready(true) : setisready(false)
      }, [])

      console.log("Data: ",product);
    return (
        <>
        {
            isReady ? (
            <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
            {
                product.map((product)=>{
                    let photo = 'http://localhost:4000/uploads/'+product.image;
                    // let photo = 'http://197.243.14.102:4000/uploads/'+product.image;
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>

                            <Card sx={{ width: '100%' }}>
                                <CardMedia
                                component="img"
                                height="300"
                                image={photo}
                                alt={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant='p'>
                                        {product.category}
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




















