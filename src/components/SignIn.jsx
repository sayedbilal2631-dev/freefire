import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  alpha,
  useTheme,
  Stack,
  Paper,
} from '@mui/material';

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login,
} from '@mui/icons-material';

import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      background: alpha(theme.palette.background.paper, 0.6),
      backdropFilter: 'blur(14px)',
      transition: 'all 0.3s ease',

      '& fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.2),
      },

      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.5),
      },

      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.35)}`,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.08)}, 
          ${alpha(theme.palette.secondary.main, 0.08)})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.15),
          filter: 'blur(90px)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.main, 0.15),
          filter: 'blur(100px)',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: '28px',
              backdropFilter: 'blur(20px)',
              background: alpha(theme.palette.background.paper, 0.75),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              boxShadow: `0 20px 60px ${alpha('#000', 0.18)}`,
            }}
          >
            <Stack spacing={3}>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="primary"
                >
                  Welcome Back
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                >
                  Sign in to continue to your account
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: 3 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'grid', gap: 3 }}
              >
                <TextField
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={inputStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={inputStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Login />}
                    disabled={loading}
                    sx={{
                      py: 1.8,
                      borderRadius: '14px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      boxShadow: `0 10px 30px ${alpha(
                        theme.palette.primary.main,
                        0.35
                      )}`,
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </motion.div>

                <Typography
                  variant="body2"
                  textAlign="center"
                  color="text.secondary"
                >
                  Don’t have an account?{' '}
                  <Link
                    to="/signup"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Create one
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}