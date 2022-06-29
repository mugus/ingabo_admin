import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/Products.css';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});


export default function Addproduct() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleAddProduct = async (e)=>{
    e.preventDefault();
    let data = JSON.stringify({
      name: name,
      size: size,
      category: category,
      price: price,
      description: description,
      image: image
    });
    let url = "http://localhost:4000/api/v1/products";
    const response = await axios.post(url,data,{headers:{"Content-Type" : "application/json"}});
    console.log(response.data);

    // alert(`image:  ${image}`)
    // axios.post('http://localhost:4000/api/v1/products', {
    //   name: name,
    //   size: size,
    //   category: category,
    //   price: price,
    //   description: description,
    //   image: image
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // axios({
    //   method: 'post',
    //   url: 'localhost:4000/api/v1/products',
    //   data: {
    //     name: name,
    //     size: size,
    //     category: category,
    //     price: price,
    //     description: description,
    //     image: image,
    //   }
    // });
    // alert(`The name you entered was: ${name} :${category} with ${price} and size of ${size} image:  ${image}`)
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
        <TextField id="standard-basic" label="Product Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />
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
        <label htmlFor="contained-button-file" style={{ paddingLeft: '10px!important' }}>
          <Input accept="image/*" id="contained-button-file" multiple type="file" value={image} onChange={(e) => setImage(e.target.value.files[0])} />
          <Button variant="outlined" component="span">
            Upload Image
          </Button>
        </label>
        <Button variant="contained" color="success" onClick={handleAddProduct}>
          Create
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