import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "#" },
    { title: "Rewards", href: "#rewards" },
    { title: "Event", href: "#event" },
    { title: "Contact", href: "#contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handle = () => {
    navigate('/')
  }
  return (
    <>
      <AppBar

        sx={{
          background: scrolled
            ? `linear-gradient(90deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}08 100%)`
            : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          boxShadow: scrolled ? '0 6px 30px rgba(0, 0, 0, 0.55)' : 'none',
          transition: 'all 0.3s ease-in-out',
          borderBottom: scrolled ? `1px solid ${theme.palette.primary.main}22` : 'none',
          position: scrolled ? 'fixed' : 'static'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: scrolled ? 1 : 2,
              transition: "all 0.3s",
              alignItems: 'center'
            }}
          >
            <Box onClick={handle} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: 'pointer' }}>
              {/* <SportsEsportsIcon sx={{ color: 'primary.main', fontSize: 32 }} /> */}
              <Box
                component="img"
                src="/images/gareena_logo.svg"
                alt="Free Fire Logo"
                sx={{ width: 30, height: 30, }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontFamily: "Orbitron",
                  background: "linear-gradient(90deg, #00e5ff, #ff6d00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                FREE FIRE
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                {navLinks.map((link) => (
                  <Typography
                    key={link.title}
                    component="a"
                    href={link.href}
                    sx={{
                      color: "text.primary",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        width: 0,
                        height: 2,
                        background: "primary.main",
                        transition: "width 0.3s",
                      },
                      "&:hover:after": {
                        width: "100%",
                      },
                    }}
                  >
                    {link.title}
                  </Typography>
                ))}
                {/* Join Event button removed per request */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Button component={Link} to="/signin" color="inherit">Sign In</Button>
                  <Button component={Link} to="/signup" variant="contained" color="primary">Sign Up</Button>
                </Box>
              </Box>
            )}

            {isMobile && (
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 250,
            background: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(10px)",
            borderLeft: "1px solid rgba(0, 229, 255, 0.2)",
          },
        }}
      >
        <List sx={{ mt: 4 }}>
          {navLinks.map((link) => (
            <ListItem button key={link.title} onClick={handleDrawerToggle}>
              <ListItemText
                primary={link.title}
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "Orbitron",
                    textAlign: "center",
                    textTransform: "uppercase",
                    py: 1,
                  },
                }}
              />
            </ListItem>
          ))}
          <Box sx={{ p: 2, display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Button component={Link} to="/signin" fullWidth color="inherit" onClick={handleDrawerToggle}>
              Sign In
            </Button>
            <Button component={Link} to="/signup" fullWidth variant="contained" color="primary" sx={{ borderRadius: '50px' }} onClick={handleDrawerToggle}>
              Sign Up
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
