import React, { useState } from 'react';
import { Box, Container, Typography, Grid, IconButton, Link, Stack, TextField, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Placeholder: implement subscribe flow if needed
    setEmail('');
  };
  return (
    <Box
      id="contact"
      sx={{
        bgcolor: '#050505',
        py: 6,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SportsEsportsIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontFamily: 'Orbitron',
                  background: 'linear-gradient(90deg, #00e5ff, #ff6d00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                FREE FIRE
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The most epic diamond giveaway event for survivors worldwide. 
              Join our community and never miss an update on upcoming events and rewards.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, YouTubeIcon].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main', bgcolor: 'rgba(0, 229, 255, 0.1)' },
                    transition: 'all 0.3s',
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="700" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
              QUICK LINKS
            </Typography>
            <Stack spacing={1}>
              {['Home', 'Rewards', 'Event', 'Sitemap'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'primary.main' }, transition: '0.3s' }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="700" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
              SUPPORT
            </Typography>
            <Stack spacing={1}>
              {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Help Center'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'primary.main' }, transition: '0.3s' }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="700" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
              JOIN OUR NEWSLETTER
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
              <TextField
                size="small"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ bgcolor: 'transparent', input: { color: 'text.primary' } }}
              />
              <Button variant="contained" color="primary" onClick={handleSubscribe} sx={{ whiteSpace: 'nowrap' }}>
                Subscribe
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Get notified about future giveaways and drops. We respect your privacy.
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Free Fire Diamond Giveaway. All rights reserved. 
            This is a community event and is affiliated with Garena.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
