import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import ProductQRCode from './screens/ProductQRCode';
import Products from './screens/Products';
import ProductUsage from './screens/ProductUsage';
import Landing from './screens/Landing';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Diagnosis from './screens/Diagnosis';
import ProductUpdate from './screens/ProductUpdate';
import DiagnosisDetails from './screens/DiagnosisDetails';
import EditDiagnosisDetails from './screens/EditDiagnosisDetails';
import Crops from './screens/Crops';
import Help from './screens/Help';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfirmProvider } from "material-ui-confirm";
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
    <ConfirmProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="Home" element={<Home />} />
          <Route path="Products" element={<Products />} />
          <Route path="code/:id" element={<ProductQRCode />} />
          <Route path="ProductUsage/:product_id" element={<ProductUsage />} />
          <Route path="ProductUpdate/:product_id" element={<ProductUpdate />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Diagnosis/:token/:crop_id" element={<Diagnosis />} />
          <Route path="DiagnosisDetails/:token/:diagnosis_id" element={<DiagnosisDetails />} />
          <Route path="EditDiagnosisDetails/:token/:diagnosis_id" element={<EditDiagnosisDetails />} />
          <Route path="Help" element={<Help />} />
          <Route path="Crops" element={<Crops />} />
        </Routes>
      </BrowserRouter>
    </ConfirmProvider>

  </ThemeProvider>
);

