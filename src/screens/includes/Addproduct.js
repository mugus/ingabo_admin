import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import '../../styles/Products.css';
import axios from 'axios';
import $ from 'jquery'; 
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Addproduct() {
  const language = localStorage.getItem('language');
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const [alertclass, setAlertclass] = useState("");

  const token = localStorage.getItem('token');

  $(document).ready(function(){
    $('.CreatePro').show()
    $('.Loading_btn').hide()
  })
  // setTimeout(
  //   () => setMsg(""),
  //   8000
  // );

  const handleAddProduct = async (e)=>{
    e.preventDefault();
    $(document).ready(function(){
      $('.CreatePro').hide()
      $('.Loading_btn').show()
    })

    const data = new FormData(); 
    data.append("lan_id", language);
    data.append("name", name);
    data.append("size", size);
    data.append("category", category);
    data.append("description", description);
    data.append("image", image);

    if(name !== '' || image !== '' || category !== '' || size !== ''){
      axios.post('http://197.243.14.102:4000/api/v1/products', data, { headers: {"Authorization" : `Bearer ${token}`} })
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
      setMsg('Fill out all field')
      setAlertclass("error")
    }


  }
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
        {
          language == 1 ?

          <>
            <div style={{ paddingLeft: 40 }}>
              {msg ? <Alert severity={alertclass}>{msg}</Alert> : <></> }
            </div>
            
            
            <br/>
            <TextField id="standard-basic" label="Izina ry'umuti" variant="standard" value={name} onChange={(e) => setName(e.target.value)} required/>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Icyiciro cy'umuti</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Product Category"
              >
                <MenuItem value="Fungicide">Fungicide</MenuItem>
                <MenuItem value="Imiti yica udukoko">Imiti yica udukoko</MenuItem>
                <MenuItem value="Ifumbire">Ifumbire</MenuItem>
                <MenuItem value="Imiti ihungira">Imiti ihungira</MenuItem>
                <MenuItem value="Imiti y'amatungo">Imiti y'amatungo</MenuItem>
                <MenuItem value="Isukura amazi">Isukura amazi</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField id="standard-basic" label="Product Category" variant="standard" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
            <TextField id="standard-basic" label="Ingano z'umuti" variant="standard" value={size} onChange={(e) => setSize(e.target.value)} />
            <TextField
                id="standard-multiline-static"
                label="Ibisobanuro uko umuti ukoreshwa(Ibindi)"
                multiline
                rows={3}
                variant="standard"
                value={description} onChange={(e) => setDescription(e.target.value)} 
              />
            <input type="file" name="image" label="file" onChange={e => {
                                const image = e.target.files[0];
                                setImage(image)
                              }} required/>
          
            <Button className="CreatePro" variant="contained" color="success" onClick={handleAddProduct}>
              Emeza Umuti
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
            <div style={{ paddingLeft: 40 }}>
              {msg ? <Alert severity={alertclass}>{msg}</Alert> : <></> }
            </div>
            
            
            <br/>
            <TextField id="standard-basic" label="Product Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} required/>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Product Category</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Product Category"
              >
                <MenuItem value="Fungicide">Fungicide</MenuItem>
                <MenuItem value="Insecticide">Insecticide</MenuItem>
                <MenuItem value="Fertilizer">Fertilizer</MenuItem>
                <MenuItem value="Seed Coating">Seed Coating</MenuItem>
                <MenuItem value="Animal product">Animal product</MenuItem>
                <MenuItem value="Water treatment">Water treatment</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField id="standard-basic" label="Product Category" variant="standard" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
            <TextField id="standard-basic" label="Product Size" variant="standard" value={size} onChange={(e) => setSize(e.target.value)} />
            <TextField
                id="standard-multiline-static"
                label="Product details(Description)"
                multiline
                rows={3}
                variant="standard"
                value={description} onChange={(e) => setDescription(e.target.value)} 
              />
            <input type="file" name="image" label="file" onChange={e => {
                                const image = e.target.files[0];
                                setImage(image)
                              }} required/>
          
            <Button className="CreatePro" variant="contained" color="success" onClick={handleAddProduct}>
              Create
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