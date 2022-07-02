import React from "react";
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import Addcrop from "./includes/Addcrop";
import Listcrops from "./includes/Listcrops";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Crops() {
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
                    <h2>Crop list</h2>
                    <Listcrops />
                  </Item>
                </Grid>
                <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                  <Item>
                    <h2>New Crop</h2>
                    <Addcrop />
                  </Item>
                </Grid>

            </Grid>




</Box>
      </>
  );
}