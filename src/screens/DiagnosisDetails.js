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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const DiagnosisDetails = () => {
    const [diag_det, setDiag_det] = useState(false)
    const [pro, setPro] = useState([]);
    const [symptoms, setSymptoms] = useState("");
    const [cause, setCause] = useState("");
    const [prevention, setPrevention] = useState("");
    const [singledetails, setSingledetails] = useState([]);
    const [msg, setMsg] = useState(true);
    const [alertclass, setAlertclass] = useState("");
    const [diagdetails, setDiagdetails] = useState([]);
    const { token, diagnosis_id } = useParams();

    const [productlist, setProductlist] = React.useState([]);

    // http://197.243.14.102:4000/api/v1/diagnosis/details
    const handleAddDiagnosisDetails = () => {
        let pro_item = productlist.toString();
        console.log("Item ", pro_item);
        const data = {
            diagnosis_id:diagnosis_id,
            recommendation_products: pro_item,
            symptoms: symptoms,
            prevention: prevention,
            cause: cause
        }
        axios.post('http://197.243.14.102:4000/api/v1/diagnosis/details', data, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
            window.location.reload()
        }).catch(err=> {
            if(err.response.data.status===403){
                console.log("Message: ",err.response.data.message);
              }else{
                console.log(err);
              }
        })
        
    }
    // http://197.243.14.102:4000/api/v1/diagnosis/single/3


    const GetProducts = () => {
        axios.get(`http://197.243.14.102:4000/api/v1/products`).then(res => {
              setPro(res.data.products)
          }).catch(err=>{
              console.log(err);
          })
    }
    const GetSingleDiagnosis = () => {
        axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/single/${diagnosis_id}`).then(res => {
            setSingledetails(res.data.diag)
        }).catch(err=>{
            console.log("Err: ",err);
        })
    }

  useEffect(() => {
    axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/${diagnosis_id}`).then(res => {
        setDiagdetails(res.data.diagnosis);
            setMsg(true)
            setDiag_det(true)
        if(res.data.diagnosis.cause === null || res.data.diagnosis.symptoms === null || res.data.diagnosis.prevention === null){
            // console.log("No data")
            setDiag_det(false)
        }else{
            // console.log("data")
            setDiag_det(true)
        }
    }).catch(err=>{
        setMsg(false)
        console.log("Error: ",err);
    })
    GetSingleDiagnosis()
    GetProducts()
}, []);
let photo = 'http://197.243.14.102:4000/uploads/'+diagdetails.image;


  return (
      <>
        {/* <Navbar /> */}
        <Box sx={{ width: '100%' }}>
            <Grid container style={{paddingTop: '5%'}}>
                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}></Grid>
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                    <Item>
                        <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase'}} color="primary"> {singledetails.name} Diagnosis Details</h2>
                        <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', paddingTop: 50, float: 'left'}}>
                        {/* { diag_det ? <><h2>No data</h2></> : <><h2>Data Available</h2></>} */}
                        {
                        diag_det ? 
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
                            
                        :
                        <>
                        <Grid item md={3} lg={3} xl={3}></Grid>
                        <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                            No Diagnosis details for {singledetails.name}
                            <hr />
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '80%' },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                
                                <Grid container>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <h6 style={{ fontWeight: 'bold', textTransform: 'uppercase'}}>{singledetails.name}</h6>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>                               
                                        <h6 style={{ fontWeight: 'bold', textTransform: 'uppercase'}}>{singledetails.diagnosis_name}</h6>
                                    </Grid>
                                </Grid>

                                {/* <TextField id="standard-basic" variant="standard" value={singledetails.name} disabled />
                                <TextField id="standard-basic" variant="standard" value={singledetails.diagnosis_name} disabled /> */}
                                <TextField
                                    id="standard-multiline-static"
                                    label="Diagnosis symptoms(Description)"
                                    multiline
                                    rows={3}
                                    variant="standard"
                                    value={symptoms} onChange={(e) => setSymptoms(e.target.value)} 
                                />
                                <TextField
                                    id="standard-multiline-static"
                                    label="Diagnosis cause(Description)"
                                    multiline
                                    rows={3}
                                    variant="standard"
                                    value={cause} onChange={(e) => setCause(e.target.value)}
                                    min={80}
                                />

                                <TextField
                                    id="standard-multiline-static"
                                    label="Diagnosis prevention(Description)"
                                    multiline
                                    rows={3}
                                    variant="standard"
                                    value={prevention} onChange={(e) => setPrevention(e.target.value)} 
                                />

                                <FormControl sx={{ m: 1, width: 300 }}>

                                    <InputLabel id="demo-multiple-name-label">Diagnosis recommendation products</InputLabel>
                                    <Select
                                            labelId="Diagnosis recommendation products"
                                            multiple
                                            value={productlist}
                                            onChange={ (event) => {
                                                const {
                                                    target: { value },
                                                } = event;
                                                setProductlist(
                                                    // On autofill we get a stringified value.
                                                    typeof value === 'string' ? value.split(',') : value,
                                                );
                                                }
                                            }
                                            input={<OutlinedInput label="Diagnosis recommendation products" />}
                                            MenuProps={MenuProps}
                                            >
                                            {pro.map((pro) => (
                                                <MenuItem
                                                key={pro.product_id}
                                                value={pro.name}
                                                >
                                                {pro.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                
                                
                                <Button variant="contained" color="success" onClick={handleAddDiagnosisDetails}>
                                    Create Diagnosis Details
                                </Button>
                            </Box>

                            <a className="text text-warning" href="../../Crops">Back</a>
                        </Grid>
                        </> 
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