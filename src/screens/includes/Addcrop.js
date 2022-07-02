import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/Products.css';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
  padding: 50
});


export default function Addcrop() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleAddCrop= async (e)=>{
    e.preventDefault();
    let data = JSON.stringify({
      name: name,
      image: image
    });
    let url = "http://localhost:4000/api/v1/crop";
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
        <TextField id="standard-basic" label="Crop Name" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="contained-button-file" style={{ paddingLeft: '10px!important' }}>
          <Input accept="image/*" id="contained-button-file" multiple type="file" value={image} onChange={(e) => setImage(e.target.value.files[0])} />
          <Button variant="outlined" component="span">
            Upload Image
          </Button>
        </label>
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