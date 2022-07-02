import React, {useState, useEffect} from 'react';
import '../styles/Products.css';
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Addproduct from "./includes/Addproduct";
import ListProducts from "./includes/ListProducts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('token'));
    if (items) {
     setItems(items);
    }
  }, []);

  console.log("Item: ", items);

  return (
    <>
      <Navbar />

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

    </>
  );
}