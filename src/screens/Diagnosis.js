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


const Diagnosis = () => {
  const [diagnosisdetails, setDiagnosisdetails] = useState([]);
  const { token, crop_id } = useParams();

  useEffect(()=> {
    axios.get(`http://197.243.14.102:4000/api/v1/crops/${crop_id}`).then(res => {
        setDiagnosisdetails(res.data.diag);
    }).catch(err=>{
        console.log(err);
    })
  }, [])

console.log("Diagnosis ",diagnosisdetails);
  return (
      <>
        {/* <Navbar /> */}
        <Box sx={{ width: '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
              <Item>
                  <h2>Diagnosis</h2>
                  
                <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
            
                  { 
                  // if(diagnosisdetails !== ''){
                    diagnosisdetails.length > 0 &&
                  diagnosisdetails.map((diagnosisdetails)=>{
                    let photo = 'http://197.243.14.102:4000/uploads/'+diagnosisdetails.image;
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={diagnosisdetails.diagnosis_id}>

                        <Card sx={{ width: '100%' }}>
                            <CardMedia
                            component="img"
                            height="300"
                            image={photo}
                            alt={diagnosisdetails.diagnosis_name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {diagnosisdetails.diagnosis_name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button value={diagnosisdetails.diagnosis_id} variant="outlined" size="small">Diagnosis Details</Button>
                            </CardActions>
                        </Card>

                      </Grid>
                    )
                  })}
                </Grid>

              </Item>
              </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <Item>
                    <h2>Record New Diagnosis</h2>

                    <Grid container spacing={0.5}>
                      <Grid item>
                        <h2>Ingabo Diagnosis Dashboard Management Screen</h2>
                        <Button href="../../Crops">Back to crop screen</Button>
                      </Grid>
                    </Grid>

                  </Item>
                </Grid>
              </Grid>
        </Box>
   
      </>
  );
}
export default Diagnosis;
