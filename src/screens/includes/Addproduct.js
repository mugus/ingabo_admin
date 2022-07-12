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



export default function Addproduct() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const [alertclass, setAlertclass] = useState("");

  const token = localStorage.getItem('token');
  $(document).ready(function(){
    $('.CreatePro').show()
    $('.Loading_btn').hide()
  })
  setTimeout(
    () => setMsg(""),
    8000
  );

  const handleAddProduct = async (e)=>{
    e.preventDefault();
    $(document).ready(function(){
      $('.CreatePro').hide()
      $('.Loading_btn').show()
    })

    const data = new FormData(); 
    data.append("name", name);
    data.append("size", size);
    data.append("category", category);
    data.append("price", price);
    data.append("description", description);
    data.append("image", image);

    
    axios.post('http://localhost:4000/api/v1/products', data, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      if(res.status===201){
        console.log(res);
        // setMsg(res.message)
        // setAlertclass("success")
      }else if(res.status===400){
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
        
        
        <br/>
        <TextField id="standard-basic" label="Product Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} required/>
        <TextField id="standard-basic" label="Product Category" variant="standard" value={category} onChange={(e) => setCategory(e.target.value)} />
        <TextField id="standard-basic" label="Product Size" variant="standard" value={size} onChange={(e) => setSize(e.target.value)} />
        <TextField id="standard-basic" label="Product Price" variant="standard" value={price} onChange={(e) => setPrice(e.target.value)} />
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
      </Box>

    {/* </Grid> */}
    {/* <div className="Products">
      <h2>Ingabo Products Dashboard Management Screen</h2>
      <a href="./" className="btn_home">Home</a>
    </div> */}
    </>
    
  );
}