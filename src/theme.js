import { alpha, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff', // Neon Blue
      light: '#6effff',
      dark: '#00b2cc',
    },
    secondary: {
      main: '#ff6d00', // Orange
      light: '#ff9e40',
      dark: '#c43e00',
    },
    info: {
      main: '#64d8f7'
    },
    success: {
      main: '#4caf50'
    },
    warning: {
      main: '#ffb300'
    },
    error: {
      main: '#ff1744', // Red
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(18, 18, 20, 0.75)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  gradients: {
    site: 'linear-gradient(90deg, #00e5ff 0%, #ff6d00 100%)',
    soft: 'linear-gradient(180deg, rgba(0,229,255,0.06), rgba(255,109,0,0.04))'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 900,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 800,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'uppercase',
          padding: '10px 24px',
          transition: 'all 0.3s ease-in-out',
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(90deg, #00e5ff, #ff6d00)',
          color: '#020202',
          boxShadow: '0 10px 30px rgba(0, 229, 255, 0.18)',
          '&:hover': {
            backgroundImage: 'linear-gradient(90deg, #6effff, #ff9e40)',
            boxShadow: '0 14px 40px rgba(0, 229, 255, 0.25)',
            transform: 'translateY(-3px)',
          },
        },
        containedSecondary: {
          boxShadow: '0 0 15px rgba(255, 109, 0, 0.5)',
          '&:hover': {
            boxShadow: '0 0 25px rgba(255, 109, 0, 0.8)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 229, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00e5ff',
            },
          },
        },
      },
    },
  },
});

export const inputStyles = {
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
export default theme;
