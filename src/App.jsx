import './App.css';
import theme from './theme';
import { auth } from './firebase';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ShowData from './components/ShowData';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import GiveawayForm from './components/GiveawayForm';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ background: theme.gradients.site, backgroundBlendMode: 'overlay', minHeight: '100vh' }}>
        <Navbar  />
        <Hero />
        <GiveawayForm />
        <ShowData />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
