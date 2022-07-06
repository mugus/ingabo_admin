import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DiagnosisDetails = () => {
  const [diagdetails, setDiagdetails] = useState([]);
  const { token, diagnosis_id } = useParams();



  useEffect(() => {
    axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/${diagnosis_id}`).then(res => {
        setDiagdetails(res.data.diagnosis);
        // console.log('test ',res.data.diagnosis.diagnosis_name);
    }).catch(err=>{
        console.log(err);
    })
}, []);
let photo = 'http://197.243.14.102:4000/uploads/'+diagdetails.image;
console.log("Diagnosis Details",diagdetails);
  return (
      <>
        {/* <Navbar /> */}
        <Box sx={{ width: '100%' }}>
            <Grid container style={{paddingTop: '5%'}}>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}></Grid>
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                    <Item>
                        <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase'}} color="primary"> {diagdetails.crop_name} Diagnosis Details</h2>
                        <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', paddingTop: 50, float: 'left'}}>
                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                <Card sx={{ width: '100%' }} style={{ textAlign: 'left' }}>
                                    <CardMedia
                                    component="img"
                                    height="300"
                                    image={photo}
                                    alt={diagdetails.diagnosis_name}
                                    />

                                    <CardContent>
                                        <Typography  variant="h6" color="primary">
                                            Cause
                                        </Typography>
                                        <Typography gutterBottom variant="p">
                                            {diagdetails.cause}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="primary">
                                            Prevention
                                        </Typography>
                                        <Typography gutterBottom variant="p">
                                            {diagdetails.prevention}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="primary" component="div">
                                            Product recommended
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="div">
                                            {diagdetails.recommendation_products}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button value="" variant="outlined" size="small">Edit Details</Button>
                                        <Button variant="outlined" size="small" href="../../Crops">Back</Button>
                                    </CardActions>

                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                                
                                <Card sx={{ width: '100%' }} style={{textAlign: 'left'}}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" color="primary" component="div" style={{ fontWeight: 'bold' ,textTransform: 'uppercase' }}>
                                            {diagdetails.diagnosis_name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" color="primary" component="div">
                                            Symptoms
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="div">
                                            {diagdetails.symptoms}
                                        </Typography>
                                    </CardContent>
                                </Card>


                            </Grid>
                        </Grid>


                        


                    </Item>
                </Grid>
                
            </Grid>
        </Box>
   
      </>
  );
}
export default DiagnosisDetails;
