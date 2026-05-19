import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url("/images/bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        pt: { xs: 12, md: 0 },
        mt: { xs: 0, md: 8 }
      }}
    >
      {/* Decorative Blur Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(0, 229, 255, 0.1)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 109, 0, 0.1)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            width: '100%',
          }}
        >
          {/* Left Content */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h6"
                color="secondary"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  mb: 1,
                  textShadow: '0 0 10px rgba(255, 109, 0, 0.5)',
                }}
              >
                LIMITED TIME EVENT
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  mb: 2,
                  background: 'linear-gradient(to bottom, #fff, #b0b0b0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                FREE FIRE <br />
                <span
                  style={{
                    color: '#00e5ff',
                    textShadow: '0 0 30px rgba(0, 229, 255, 0.5)',
                    WebkitTextFillColor: '#00e5ff',
                  }}
                >
                  DIAMOND
                </span>{' '}
                <br />
                GIVEAWAY
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  mb: 4,
                  maxWidth: '500px',
                  lineHeight: 1.6,
                }}
              >
                Join the ultimate survivors' event! Claim your free diamonds today
                and dominate the battlefield with exclusive skins and crates. 10,000+
                players already rewarded.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" color="primary" size="large" href="#rewards" className="btn-neon" sx={{ py: 2, px: 6, fontSize: '1rem' }}>
                  Claim Diamonds
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1rem',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      background: 'rgba(0, 229, 255, 0.05)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </motion.div>
          </Box>

          {/* Right Image */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Box
                component="img"
                src="/images/diamond.jpg"
                alt="Free Fire Diamond Giveaway"
                sx={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '500px',
                  filter: 'drop-shadow(0 0 50px rgba(0, 229, 255, 0.3))',
                  animation: 'float 6s ease-in-out infinite',
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Scroll Down Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.2em' }}>
          SCROLL
        </Typography>
        <Box
          sx={{
            width: '2px',
            height: '50px',
            background: 'linear-gradient(to bottom, var(--neon-blue), transparent)',
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
