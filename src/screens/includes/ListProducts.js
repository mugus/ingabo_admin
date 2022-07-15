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
import ButtonGroup from '@mui/material/ButtonGroup';
import { useConfirm } from "material-ui-confirm";

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
  const [product, setProduct] = useState([]);
  const [isReady, setisready] = useState(false);
  const [open, setOpen] = React.useState(false);
  const confirm = useConfirm();
  const [pro_modal, setPro_modal] = useState([]);
  const token = localStorage.getItem('token');
  $(document).ready(function(){
    $('.CreatePro').show()
    $('.Loading_btn').hide()
  })



    const handleProUsage = (product_id) => {
      window.location.replace(`./ProductUsage/${product_id}`)
      // alert("ready"+product_id)
    }

    const handleOpen = (product_id) =>{
      axios.get(`http://localhost:4000/api/v1/products/${product_id}`).then(res => {
        // axios.get('http://197.243.14.102:4000/api/v1/products').then(res => {
          // setProduct(res.data.product);
          setPro_modal(res.data.product)
          // console.log("Product: ", res.data.product);
          setOpen(true);
      }).catch(err=>{
        if(err.response.data.status === 404){
          alert(err.response.data.message);
          console.log(err.response.data.message);
        }else{
          console.log(err);
        }
      })
    }
    
    const handleClose = () => setOpen(false);


    // Delete product
    const handleDelete = product_id => {
      confirm({ description: `You are going to permanently delete` })
        .then(() => {
          axios.delete(`http://localhost:4000/api/v1/products/${product_id}`, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => {
        // axios.get('http://197.243.14.102:4000/api/v1/products').then(res => {
          // setProduct(res.data.products);
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
        axios.get('http://localhost:4000/api/v1/products').then(res => {
        // axios.get('http://197.243.14.102:4000/api/v1/products').then(res => {
          setProduct(res.data.products);
        }).catch(err=>{
            console.log(err);
        })
        product ? setisready(true) : setisready(false)
      }, [])

let photo_modal = 'http://localhost:4000/uploads/'+pro_modal.image;
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
                                    
                                <ButtonGroup size="small" aria-label="small button group">
                                  <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5cb85c' }} value={product.product_id} onClick={(e)=> handleProUsage(e.target.value)}>Product usage</Button>
                                  <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#5bc0de' }} value={product.product_id} onClick={e => handleOpen(e.target.value)}>Edit Details</Button>
                                  {/* <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#f0ad4e' }} value={product.product_id} onClick={handleDelete(product)}>Delete</Button> */}
                                  <Button style={{ fontSize: 11, color: '#fff' , backgroundColor: '#f0ad4e' }} value={product.product_id} onClick={e => handleDelete(e.target.value)}>Delete</Button>
                                </ButtonGroup>

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
            rows={4}
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

















{/* <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
<div className="modal-dialog modal-dialog-centered">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      Show a second modal and hide this one with the button below.
    </div>
    <div className="modal-footer">
      <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
    </div>
  </div>
</div>
</div>
<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
<div className="modal-dialog modal-dialog-centered">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      Hide this modal and show the first with the button below.
    </div>
    <div className="modal-footer">
      <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
    </div>
  </div>
</div>
</div>

<a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}



