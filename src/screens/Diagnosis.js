import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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
import { FormControl, FormControlLabel, FormGroup } from "@mui/material";
import Alert from '@mui/material/Alert';


const Input = styled('input')({
  display: 'none',
  padding: 50
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Diagnosis = () => {
  const [diagnosis_name, setDiagnosis_name] = useState("");
  const [diagnosisdetails, setDiagnosisdetails] = useState([]);
  const [image, setImage] = useState("");
  const { token, crop_id } = useParams();
  const [msg, setMsg] = useState("");
  const [alertclass, setAlertclass] = useState("");
  const [cropdetails, setCropdetails] = useState([]);


  const handlediagnosisDetails =(diagnosis_id)=>{
    const token = localStorage.getItem('token');
    window.location.replace(`../../DiagnosisDetails/${token}/${diagnosis_id}`)
    // alert("Diagnosis ID: "+diagnosis_id)
  }

  const handleAddDiagnosis = async(e) => {
    const data = new FormData(); 
    data.append('crop_id', crop_id);
    data.append("diagnosis_name", diagnosis_name);
    data.append("image", image);

    // console.log("data: ", data);
    axios.post('http://localhost:4000/api/v1/diagnosis', data, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      window.location.reload()
      console.log(res.message);
    }).catch(function (error) {
      if(error.response.data.status===403){
        console.log("Message: ",error.response.data.message);
        // setMsg(error.response.data.message)
        setMsg(error.response.data.message)
        setAlertclass("error")
      }else{
        console.log(error);
      }
  });


  }



//   const GetSingleDiagnosis = () => {

// }



  useEffect(()=> {
    axios.get(`http://localhost:4000/api/v1/crops/${crop_id}`).then(res => {
      // axios.get(`http://197.243.14.102:4000/api/v1/crops/${crop_id}`).then(res => {
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
                    diagnosisdetails.length > 0 ?
                  diagnosisdetails.map((diagnosisdetails)=>{
                    let photo = 'http://localhost:4000/uploads/'+diagnosisdetails.diag_image;
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
                                <small>{diagnosisdetails.crop_name}  </small>
                            </CardContent>
                            <CardActions>
                                <Button value={diagnosisdetails.diagnosis_id} variant="outlined" size="small" onClick={e => handlediagnosisDetails(e.target.value)}>Diagnosis Details</Button>
                            </CardActions>
                        </Card>

                      </Grid>
                    )
                  }): 
                  <>
                  <Grid item xs={5} sm={6} md={4} lg={4} xl={3}></Grid>
                  <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>

                    <h6 style={{paddingTop: 20}}>No Diagnois found</h6>

                  </Grid>
                  </>}
                </Grid>

              </Item>
              </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <Item>
                    <h2>Record New Diagnosis</h2>
                    {/* <img src={img} width="80%" height="200" alt="" /> */}
                    <Grid container spacing={0.5}>
                      <Grid item>

                        <Box
                          component="form"
                          sx={{
                            '& > :not(style)': { m: 1, width: '80%' },
                          }}
                          noValidate
                          autoComplete="off"
                          >
                            <div style={{ paddingLeft: 40 }}>
                            {msg ? <Alert severity={alertclass}>{msg}</Alert> : <></> }
                          </div>

                          <TextField id="standard-basic" label="Diagnosis Name" variant="standard" value={diagnosis_name} onChange={(e) => setDiagnosis_name(e.target.value)} />
                          <input type="file" name="image" label="file" onChange={e => {
                            const image = e.target.files[0];
                            setImage(image)
                          }}/>
                          
                          <Button variant="contained" color="success" onClick={handleAddDiagnosis}>
                            Create Diagnosis
                          </Button>
                        </Box>

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
