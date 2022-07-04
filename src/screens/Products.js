import React, {useState, useEffect} from 'react';
import '../styles/Products.css';
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Addproduct from "./includes/Addproduct";
import ListProducts from "./includes/ListProducts";
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Products() {
  const [items, setItems] = useState([]);
  const [Ready, setready] = useState(false);

  useEffect(() => {
    const items = localStorage.getItem('token');
    if (items) {
     setItems(items);
     setready(true);
    }
  }, []);

  // console.log("Token: ", Ready);
  // console.log("Item: ", localStorage.getItem('token'));

  return (
    <>
      <Navbar />
    {
      Ready ? (

      <Box sx={{ width: '100%' }}>
        <Grid container>
          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item>
              <Navbar />
            </Item>
          </Grid> */}

            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
              <Item>
                <h2>Product list</h2>
                  <ListProducts />
              </Item>
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
              <Item>
                <h2>New Product</h2>
                  <Addproduct />
              </Item>
            </Grid>

        </Grid>
      </Box>
      ) : ( 
      <Grid container style={{paddingTop: 30}}>
        <Grid item xl={5} lg={5} md={4}></Grid>
        <Grid item xl={6} lg={3} md={3}>
            <center>
                <CircularProgress />
                <h4>Looks like you are not logged in</h4>
                <Button href="./" variant='contained' color='primary'>Click to Login</Button>
            </center>
        </Grid>

      </Grid>
    ) }
    </>
  );
}