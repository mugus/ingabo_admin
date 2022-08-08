import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery'; 
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


const EditDiagnosisDetails = () => {
    const [diag_det, setDiag_det] = useState(false)
    const [pro, setPro] = useState([]);
    const [symptoms, setSymptoms] = useState("");
    const [cause, setCause] = useState("");
    const [prevention, setPrevention] = useState("");
    const [singledetails, setSingledetails] = useState([]);
    const [msg, setMsg] = useState(true);
    const [alertclass, setAlertclass] = useState("");
    const [diagno_cause, setDiagno_cause] = useState("");
    const [diagno_symptoms, setDiagno_symptoms] = useState("");
    const [diagno_prevention, setDiagno_prevention] = useState("");
    const [productlist, setProductlist] = React.useState([]);
    const [diagdetails, setDiagdetails] = useState([]);
    const { token, diagnosis_id } = useParams();
    const language = localStorage.getItem('language');

    $(function(){
        $('.CreatePro').show()
        $('.Loading_btn').hide()
      }) 


    const GetProducts = () => {
        axios.get(`http://localhost:4000/api/v1/products`).then(res => {
              setPro(res.data.products)
          }).catch(err=>{
              console.log(err);
          })
    }


console.log("token", token);

const handleUpdateDiagDetails =()=>{
    $(function(){
        $('.CreatePro').hide()
        $('.Loading_btn').show()
    })

    let pro_item = productlist.toString();
    const data = {
        symptoms: diagno_symptoms ? diagno_symptoms : diagdetails.symptoms,
        cause: diagno_cause? diagno_cause : diagdetails.cause,
        prevention: diagno_prevention ? diagno_prevention : diagdetails.prevention,
        recommendation_products: pro_item ? pro_item : diagdetails.recommendation_products
    }

    axios.patch(`http://localhost:4000/api/v1/diagnosis/${diagnosis_id}`, data, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
        alert("Updated")
        window.location.reload()
    }).catch(err=>{
        if(err.response.data.status===403){
            alert(err.response.data.message)
            window.location.replace('../../')
            // console.log("Message: ",err.response.data.message);
          }else{
            console.log(err);
          }
    })
}

    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/diagnosis/${diagnosis_id}`).then(res => {
            setDiagdetails(res.data.diagnosis);
            // console.log("res.data.diagnosis", res.data.diagnosis);
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
        GetProducts()
    }, []);


    let photo = 'http://localhost:4000/uploads/'+diagdetails.image;


    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Grid container style={{paddingTop: '2%'}}>

                        



                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}></Grid>

                <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase'}} color="primary">Hindura ubusobanuro bwa {diagdetails.diagnosis_name}</h2>
                    <Grid container style={{paddingTop: '2%'}}>

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
                                        Impamvu
                                    </Typography>
                                    <Typography gutterBottom variant="p">
                                        {diagdetails.cause}
                                    </Typography>

                                    <Typography gutterBottom variant="p">
                                        <TextField
                                            style={{ width: '90%' }}
                                            id="standard-multiline-static"
                                            label="Add New Cause"
                                            multiline
                                            rows={3}
                                            variant="standard"
                                            value={diagno_cause} onChange={(e) => setDiagno_cause(e.target.value)}
                                            min={80}
                                        />
                                    </Typography>



                                    <Typography gutterBottom variant="h6" color="primary">
                                        Uko yirindwa
                                    </Typography>
                                    <Typography gutterBottom variant="p">
                                        {diagdetails.prevention}
                                    </Typography>

                                    <Typography gutterBottom variant="p">
                                        <TextField
                                            style={{ width: '90%' }}
                                            id="standard-multiline-static"
                                            label="Add New Prevention"
                                            multiline
                                            rows={3}
                                            variant="standard"
                                            value={diagno_prevention} onChange={(e) => setDiagno_prevention(e.target.value)}
                                            min={80}
                                        />
                                    </Typography>


                                    <Typography gutterBottom variant="h6" color="primary" component="div">
                                        Imiti wakoresha
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="div">
                                        {diagdetails.recommendation_products}
                                    </Typography>

                                    <Typography gutterBottom variant="p" component="div">
                                    <FormControl sx={{ m: 1, width: 300 }}>

                                        <InputLabel id="demo-multiple-name-label">Imiti yakoreshwa havurwa {singledetails.diagnosis_name}</InputLabel>
                                        <Select
                                            labelId="Imiti yakoreshwa"
                                            multiple
                                            value={productlist}
                                            onChange={ (event) => {
                                                const {
                                                    target: { value },
                                                } = event;
                                                setProductlist(
                                                    // On autofill we get a stringified value.
                                                    typeof value === 'string' ? value.split(', ') : value,
                                                );
                                                }
                                            }
                                            input={<OutlinedInput label="Imiti yakoreshwa" />}
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
                                    </Typography>

                                </CardContent>
                                

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

                                    <Typography gutterBottom variant="p">
                                        <TextField
                                            style={{ width: '90%' }}
                                            id="standard-multiline-static"
                                            label="Add New Symptoms"
                                            multiline
                                            rows={3}
                                            variant="standard"
                                            value={diagno_symptoms} onChange={(e) => setDiagno_symptoms(e.target.value)}
                                            min={80}
                                        />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button value="" variant="outlined" size="small" onClick={handleUpdateDiagDetails} className="CreatePro" >Confirm changes</Button>
                                    <LoadingButton
                                        loading
                                        loadingPosition="center"
                                        variant="contained"
                                        color="primary"
                                        className='Loading_btn'
                                    >
                                        Wait
                                    </LoadingButton>
                                    <Button variant="outlined" size="small" href="../../Crops">Subira inyuma</Button>
                                </CardActions>
                            </Card>


                        </Grid>
                    </Grid>



                </Grid>
                        
            </Grid>
        </Box>
        </>
    )




}

export default EditDiagnosisDetails;