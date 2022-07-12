import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import $ from 'jquery';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  // height: '50%', overflowY: 'scroll', paddingTop: 20, paddingBottom: 15,
  bgcolor: 'background.paper',
  border: '2px solid #2e4037',
  boxShadow: 24,
  p: 4,
  '*::-webkit-scrollbar-track': {
    width: '0.4em'
  }
};


export default function ListProducts() {
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const [pro_modal, setPro_modal] = useState([]);
    const handleOpen = (product_id) =>{
      axios.get(`http://localhost:4000/api/v1/products/${product_id}`).then(res => {
        // axios.get('http://197.243.14.102:4000/api/v1/products').then(res => {
          // setProduct(res.data.product);
          setPro_modal(res.data.product)
          // console.log("Product: ", res.data.product);
          setOpen(true);
      }).catch(err=>{
          console.log(err);
      })
    }
    let photo_modal = 'http://localhost:4000/uploads/'+pro_modal.image;
    
    const handleClose = () => setOpen(false);
    
    const [product, setProduct] = useState([]);
    const [isReady, setisready] = useState(false);
    
    $(document).ready(function(){
      $('.CreatePro').show()
      $('.Loading_btn').hide()
    })


    useEffect(()=> {
        axios.get('http://localhost:4000/api/v1/products').then(res => {
        // axios.get('http://197.243.14.102:4000/api/v1/products').then(res => {
          setProduct(res.data.products);
        }).catch(err=>{
            console.log(err);
        })
        product ? setisready(true) : setisready(false)
      }, [])

      // console.log("Data: ",product);
    return (
        <>
        {
            isReady ? (
            <Grid container spacing={0.5} style={{height: window.innerHeight + 'px', overflowY: 'scroll'}}>
            {
                product.map((product)=>{
                    let photo = 'http://localhost:4000/uploads/'+product.image;
                    // let photo = 'http://197.243.14.102:4000/uploads/'+product.image;
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={product.product_id}>

                            <Card sx={{ width: '100%' }}>
                                <CardMedia
                                component="img"
                                height="300"
                                image={photo}
                                alt={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant='p'>
                                        {product.category}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    
                                <Button variant="outlined" size="small" onClick={()=> alert("Usage is ready")}>Product usage</Button>
                                <Button variant="outlined" size="small" value={product.product_id} onClick={e => handleOpen(e.target.value)}>Edit Details</Button>
                                </CardActions>
                            </Card>

                        </Grid>
                    )
                })
            }

            </Grid>
            ) : (
                <CircularProgress />
            )
        }

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container >
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <img src={photo_modal} width="150" height='200' />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <h4>Update <b>{pro_modal.name}</b> Product Deatils</h4>
                <br/>
                <Typography color='primary'>Change Image</Typography>
                <input type="file" name="image" label="file"  />
              </Grid>
            </Grid>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
        <TextField id="standard-basic" value={pro_modal.name} label="Product Name" variant="standard"/>
        <TextField id="standard-basic" value={pro_modal.category} label="Product Category" variant="standard" />
        <TextField id="standard-basic" value={pro_modal.size} label="Product Size" variant="standard" />
        <TextField
            value={pro_modal.description}
            id="standard-multiline-static"
            label="Product details(Description)"
            multiline
            rows={3}
            variant="standard"
          />          
        
       
        <Button className="CreatePro" variant="contained" color="success">
          Update
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

          </Typography>
        </Box>
      </Modal>
        </>
    )
}




















