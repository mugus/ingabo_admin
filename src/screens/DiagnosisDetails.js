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
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DiagnosisDetails = () => {
    const [diagnosis_name, setDiagnosis_name] = useState("");
    const [singledetails, setSingledetails] = useState([]);
    const [image, setImage] = useState("");
    const [msg, setMsg] = useState("");
    const [alertclass, setAlertclass] = useState("");
    const [diagdetails, setDiagdetails] = useState([]);
    const { token, diagnosis_id } = useParams();

    const handleAddDiagnosisDetails = () => {
        alert("ready")
    }
    // http://localhost:4000/api/v1/diagnosis/single/3

    const GetSingleDiagnosis = () => {
        axios.get(`http://localhost:4000/api/v1/diagnosis/single/${diagnosis_id}`).then(res => {
            // setDiagdetails(res.data.diag);
            setSingledetails(res.data.diag)
            console.log('Data: ',res.data.diag);
            // console.log('test ',res.data.diagnosis.diagnosis_name);
        }).catch(err=>{
            // alert(err.response.data.message);
            setMsg(err.response.data.message)
            // window.location.replace('./Diagnosis');
            // console.log(err);
        })
    }

  useEffect(() => {
    axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/${diagnosis_id}`).then(res => {
        setDiagdetails(res.data.diagnosis);
        // console.log('test ',res.data.diagnosis.diagnosis_name);
    }).catch(err=>{
        // alert(err.response.data.message);
        setMsg(err.response.data.message)
        // window.location.replace('./Diagnosis');
        // console.log(err);
    })
    GetSingleDiagnosis()
}, []);

let photo = 'http://197.243.14.102:4000/uploads/'+diagdetails.image;
console.log("Diagnosis Details",singledetails.diagnosis_name);
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
                        { msg ? (
                            <>
                            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                            {msg}
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '80%' },
                                }}
                                noValidate
                                autoComplete="off"
                                >

                                <TextField id="standard-basic" label="Diagnosis Name" variant="standard" value={diagnosis_name} onChange={(e) => setDiagnosis_name(e.target.value)} />
                                <input type="file" name="image" label="file" onChange={e => {
                                    const image = e.target.files[0];
                                    setImage(image)
                                }}/>
                                
                                <Button variant="contained" color="success" onClick={handleAddDiagnosisDetails}>
                                    Create Diagnosis Details
                                </Button>
                            </Box>

                                <a className="text text-warning" href="../../Crops">Back</a>
                            </Grid>
                            </>
                        )  : 
                            (
                                <>
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
                                </>
                            )
                        }
                            
                        </Grid>


                        


                    </Item>
                </Grid>
                
            </Grid>
        </Box>
   
      </>
  );
}
export default DiagnosisDetails;
