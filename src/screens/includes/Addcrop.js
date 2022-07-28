import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/Products.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
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
  const [language, setLanguage] = useState("")
  const [msg, setMsg] = useState("");
  const [alertclass, setAlertclass] = useState("");
  const token = localStorage.getItem('token');

  const handleAddCrop= async (e)=>{
    e.preventDefault();
    const data = new FormData(); 
    data.append("name", name);
    data.append("image", image);
    data.append("lan_id", language);
    //ALTER TABLE `crops` ADD `lan_id` INT(11) NOT NULL DEFAULT '2' AFTER `crop_id`, ADD INDEX (`lan_id`);
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
  }
  console.log("Language ", language);
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

        <TextField id="standard-basic" label="Crop Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Product language</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Product Category"
          >
            <MenuItem value="1">Kinyarwanda</MenuItem>
            <MenuItem value="2">English</MenuItem>
          </Select>
        </FormControl>

        <input type="file" name="image" label="file" onChange={e => {
                            const image = e.target.files[0];
                            setImage(image)
                          }} required/>
        <Button variant="contained" color="success" onClick={handleAddCrop}>
          Create Crop
        </Button>
      </Box>

    {/* </Grid> */}
    {/* <div className="Products">
      <h2>Ingabo Products Dashboard Management Screen</h2>
      <a href="./" className="btn_home">Home</a>
    </div> */}
    </>
    
  );
}