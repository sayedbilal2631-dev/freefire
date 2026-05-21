import './App.css';
import React from 'react';
import theme from './theme';
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ShowData from './components/ShowData';
import GiveawayForm from './components/GiveawayForm';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { useCurrentUser } from './contexts/CurrentUser';

function App() {
  const { user } = useCurrentUser();
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ background: theme.gradients.site, backgroundBlendMode: 'overlay', minHeight: '100vh' }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<>
                {user == null ? (<SignUp />) : (
                  <>
                  <Hero />
                    <GiveawayForm />
                    <ShowData />
                  </>
                )
                }

              </>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </Box>
    </ThemeProvider>
  );
}

export default App;
