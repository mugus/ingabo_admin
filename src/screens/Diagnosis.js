import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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
import { useConfirm } from "material-ui-confirm";
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
  const confirm = useConfirm();
  const language = localStorage.getItem('language');
  const [diagnosis_name, setDiagnosis_name] = useState("");
  const [diagnosisdetails, setDiagnosisdetails] = useState([]);
  const [image, setImage] = useState("");
  const { token, crop_id } = useParams();
  const [msg, setMsg] = useState("");
  const [alertclass, setAlertclass] = useState("");
  const [diag_details, setDiag_details] = useState("");
  const [new_image, setNew_image] = useState("");
  const [diagno_name, setDiagno_name] = useState("")


  $(document).ready(function(){
    $('.CreatePro').show()
    $('.Loading_btn').hide()
  })
  $(document).ready(function(){
    $('.CreateProImg').show()
    $('.Loading_btnImg').hide()
})

  const handlediagnosisDetails =(diagnosis_id)=>{
    const token = localStorage.getItem('token');
    window.location.replace(`../../DiagnosisDetails/${token}/${diagnosis_id}`)
    // alert("Diagnosis ID: "+diagnosis_id)
  }

  const handleAddDiagnosis = async(e) => {

    $(document).ready(function(){
      $('.CreatePro').hide()
      $('.Loading_btn').show()
    })


    const data = new FormData(); 
    data.append('crop_id', crop_id);
    data.append("diagnosis_name", diagnosis_name);
    data.append("image", image);

    // console.log("data: ", data);
    if(diagnosis_name === '' || image === ''){
      setMsg("Fill all fields")
      setAlertclass("error")
    }else{
      axios.post('http://197.243.14.102:4000/api/v1/diagnosis', data, { headers: {"Authorization" : `Bearer ${token}`} })
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


  }


// Delete Diagnosis
const handleDeleteDiag = diagnosis_id => {
  confirm({ description: `You are going to permanently delete` })
    .then(() => {
      // console.log("Ready");
          axios.delete(`http://197.243.14.102:4000/api/v1/diagnosis/${diagnosis_id}`, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
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



  useEffect(()=> {
    axios.get(`http://197.243.14.102:4000/api/v1/crops/${crop_id}`).then(res => {
        setDiagnosisdetails(res.data.diag);
    }).catch(err=>{
        console.log(err);
    })

  }, [])

    // Get modal content
    $(document).on('click', '.view_data', function(e){
      e.preventDefault();
      var diagnosis_id = $(this).data('id');
      GetDiagnosis(diagnosis_id);
    });
    const GetDiagnosis =(diagnosis_id)=>{
        axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/single/${diagnosis_id}`).then(res => {
            setDiag_details(res.data.diag)
          }).catch(err=>{
            if(err.response.data.status === 404){
              alert(err.response.data.message);
              console.log(err.response.data.message);
            }else{
              console.log(err);
            }
          })
    }
    // End Get modal content

  const EditDiagnosisName = () =>{
    $(document).ready(function(){
      $('.CreatePro').hide()
      $('.Loading_btn').show()
  })
  let data = {
      diagnosis_name: diagno_name
  }

    axios.put(`http://197.243.14.102:4000/api/v1/diagnosis/single/${diag_details.diagnosis_id}`,data, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
      window.location.reload()
    }).catch(err=>{
      if(err.response.data.status === 404){
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }else{
        console.log(err.response);
      }
    })

  }

  const EditDiagnosisImage = () =>{
    $(document).ready(function(){
      $('.CreateProImg').hide()
      $('.Loading_btnImg').show()
    })
    let data = new FormData();
    data.append("image", new_image);
    axios.put(`http://197.243.14.102:4000/api/v1/diagnosis/profile/${diag_details.diagnosis_id}`,data, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
        window.location.reload()
    }).catch(err=>{
      if(err.response.data.status === 404){
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }else{
        console.log(err.response);
      }
    })

  }



  let modal_photo = 'http://197.243.14.102:4000/uploads/'+diag_details.diag_img;
  return (
      <>
        {/* <Navbar /> */}
        <Box sx={{ width: '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                  
                  {
                    language == 1 ?
                    <Item>
                        <h2>Indwara</h2>
                        
                      <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
                  
                        { 
                        // if(diagnosisdetails !== ''){
                          diagnosisdetails.length > 0 ?
                        diagnosisdetails.map((diagnosisdetails)=>{
                          let photo = 'http://197.243.14.102:4000/uploads/'+diagnosisdetails.diag_image;
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
                                      <Button value={diagnosisdetails.diagnosis_id} variant="outlined" size="small" onClick={e => handlediagnosisDetails(e.target.value)}>Ibisobanuro</Button>
                                      <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} className="view_data" data-bs-toggle="modal" href="#exampleModalToggle"
                                              data-id={diagnosisdetails.diagnosis_id}>
                                                Hindura
                                      </Button>
                                      <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }}  className="btn btn-danger"
                                       value={diagnosisdetails.diagnosis_id} onClick={e => handleDeleteDiag(e.target.value)}>Siba</Button>
                                  </CardActions>
                              </Card>

                            </Grid>
                          )
                        }): 
                        <>
                        <Grid item xs={5} sm={6} md={4} lg={4} xl={3}></Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>

                          <h6 style={{paddingTop: 20}}>Nta ndwara ku gihingwa zibonetse</h6>

                        </Grid>
                        </>}
                      </Grid>

                    </Item>
                    :
                    <Item>
                        <h2>Diagnosis</h2>
                        
                      <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
                  
                        { 
                        // if(diagnosisdetails !== ''){
                          diagnosisdetails.length > 0 ?
                        diagnosisdetails.map((diagnosisdetails)=>{
                          let photo = 'http://197.243.14.102:4000/uploads/'+diagnosisdetails.diag_image;
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
                                      <Button value={diagnosisdetails.diagnosis_id} variant="outlined" size="small" className="btn btn-info" onClick={e => handlediagnosisDetails(e.target.value)}>Details</Button>
                                      <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} className="btn view_data" data-bs-toggle="modal" href="#exampleModalToggle"
                                        data-id={diagnosisdetails.diagnosis_id}>
                                          Edit
                                      </Button>
                                      <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }}  className="btn btn-danger"
                                       value={diagnosisdetails.diagnosis_id} onClick={e => handleDeleteDiag(e.target.value)}>Delete</Button>
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
                  }
              
              </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <Item>
                    { language == 1 ? <h2>Andika Indwara nshya</h2> :<h2>Record New Diagnosis</h2>}
                    {/* <img src={img} width="80%" height="200" alt="" /> */}
                    <Grid container spacing={0.5}>
                      <Grid item>
                          {
                            language == 1 ?
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

                              <TextField id="standard-basic" label="Izina ry'indwara" variant="standard" value={diagnosis_name} onChange={(e) => setDiagnosis_name(e.target.value)} />
                              <input type="file" name="image" label="file" onChange={e => {
                                const image = e.target.files[0];
                                setImage(image)
                              }}/>
                              
                              <Button variant="contained" color="success" className="CreatePro" onClick={handleAddDiagnosis}>
                                Emeza indwara
                              </Button>
                              <LoadingButton
                                loading
                                loadingPosition="center"
                                variant="contained"
                                color="primary"
                                className='Loading_btn'
                              >
                                Tegereza gato
                              </LoadingButton>
                            </Box>
                            :
                            
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
                            
                            <Button variant="contained" className="CreatePro" color="success" onClick={handleAddDiagnosis}>
                              Create Diagnosis
                            </Button>
                            <LoadingButton
                              loading
                              loadingPosition="center"
                              variant="contained"
                              color="primary"
                              className='Loading_btn'
                            >
                              Wait
                            </LoadingButton>
                          </Box>
                          }
                        

                        
                        { language == 1 ? <Button href="../../Crops">Subira inyuma ku bihingwa</Button> : <Button href="../../Crops">Back to crop screen</Button>}
                        
                      </Grid>
                    </Grid>

                  </Item>
                </Grid>
              </Grid>
        </Box>
   

<div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
  <div className="modal-dialog modal-md">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel">Diagnosis Name: <span className='text-muted'>{diag_details.diagnosis_name}</span> </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className='container'>


            <div className='row'>
                <div className='col-md-5'>
                    <div className="form-group">
                        <div style={{ width: 170, height: 200 }}>
                            <img src={modal_photo} alt='crop image' width='170' height='200'/>
                        </div>
                            <br/>
                            <input type='file' onChange={e => { const new_image = e.target.files[0]; setNew_image(new_image) }}/>
                    </div><br/>
                    <div className="form-group">
                        <button className="btn btn-success btn-sm btn-block CreateProImg" style={{ width: '100%' }} onClick={EditDiagnosisImage}>Update image</button>
                        <LoadingButton
                              loading
                              loadingPosition="center"
                              variant="contained"
                              color="primary"
                              style={{ width: '100%' }} 
                              className='Loading_btnImg'
                            >
                              Wait
                            </LoadingButton>
                    </div>
                    
                </div>

                <div className='col-md-7'>
                    <div className="form-group">
                        <TextField id="standard-basic" label="Add New name" variant="standard" value={diagno_name} onChange={(e) => setDiagno_name(e.target.value)} style={{ width: '100%' }} />
                        {/* <input type="hidden" className="form-control" value={crop_modal.crop_id} placeholder="Change name" onChange={(e) => setCrop_id(e.target.value)}/> */}
                    </div><br/>
                    <div className="form-group">
                        <button className="btn btn-success btn-sm btn-block CreatePro" style={{ width: '100%' }} onClick={EditDiagnosisName}>Update name</button>
                        <LoadingButton
                              loading
                              loadingPosition="center"
                              variant="contained"
                              color="primary"
                              style={{ width: '100%' }} 
                              className='Loading_btn'
                            >
                              Wait
                            </LoadingButton>
                    </div>
                </div>
            </div>

          

        </div>



      </div>
    </div>
  </div>
</div>



      </>
  );
}
export default Diagnosis;
