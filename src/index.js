import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Products from './screens/Products';
import Landing from './screens/Landing';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Diagnosis from './screens/Diagnosis';
import Crops from './screens/Crops';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#757ce8',
      main: '#5d806e',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ecb338',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="Home" element={<Home />} />
        <Route path="Products" element={<Products />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Diagnosis" element={<Diagnosis />} />
        <Route path="Crops" element={<Crops />} />
      </Routes>
    </BrowserRouter>

  </ThemeProvider>
);

