import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Sign In</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          <TextField label="Password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          <Button type="submit" variant="contained">Sign In</Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">Don’t have an account? <Link to="/signup">Sign up</Link></Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
