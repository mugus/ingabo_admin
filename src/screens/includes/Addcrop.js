import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import '../../styles/Products.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import $ from 'jquery'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Input = styled('input')({
  display: 'none',
  padding: 50
});


export default function Addcrop() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const language = localStorage.getItem('language');
  const [msg, setMsg] = useState("");
  const [alertclass, setAlertclass] = useState("");
  const token = localStorage.getItem('token');

  $(document).ready(function(){
    $('.CreatePro').show()
    $('.Loading_btn').hide()
  })


  const handleAddCrop= async (e)=>{
    e.preventDefault();
    $(document).ready(function(){
      $('.CreatePro').hide()
      $('.Loading_btn').show()
    })

    
    const data = new FormData(); 
    data.append("name", name);
    data.append("image", image);
    data.append("lan_id", language);
    //ALTER TABLE `crops` ADD `lan_id` INT(11) NOT NULL DEFAULT '2' AFTER `crop_id`, ADD INDEX (`lan_id`);
    if(name !== '' || image !== ''){

      axios.post('http://197.243.14.102:4000/api/v1/crops', data, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        if(res.status===201){
          window.location.reload()
          console.log(res.message);
          // alert('Product Created')
          setMsg(res.message)
          setAlertclass("success")
        }else if(res.status===400){
          console.log(res);
          setMsg(res.message)
          setAlertclass("error")
        }else if(res.status===403){
          console.log(res);
          setMsg(res.message)
          setAlertclass("error")
        }else{
          console.log(res)
        }
        // console.log('Axios response: ', res)
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
    }else{
      setMsg('Fill out all fields')
      setAlertclass("error")
    }

  }
  // console.log("Language ", language);
  return (
    <>
    {/* <Grid item spacing={2}> */}
      {/* <Item></Item> */}
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
        {
        language == 1 ?
        <>
        <TextField id="standard-basic" label="Izina ry'igihingwa" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />

        <input type="file" name="image" label="file" onChange={e => {
                            const image = e.target.files[0];
                            setImage(image)
                          }} required/>
        <Button variant="contained" color="success" className='CreatePro' onClick={handleAddCrop}>
          Andika Igihingwa
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
        </>
        :
        <>
        <TextField id="standard-basic" label="Crop Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />

        <input type="file" name="image" label="file" onChange={e => {
                            const image = e.target.files[0];
                            setImage(image)
                          }} required/>
        <Button variant="contained" color="success" className='CreatePro' onClick={handleAddCrop}>
          Create Crop
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
        </>

        }
       

        
      </Box>

    {/* </Grid> */}
    {/* <div className="Products">
      <h2>Ingabo Products Dashboard Management Screen</h2>
      <a href="./" className="btn_home">Home</a>
    </div> */}
    </>
    
  );
}