import React from 'react';
import { Link } from 'react-router-dom';
import AuthDetails from './AuthDetails';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Menu = () => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login ReactVite + Firebase v9
          </Typography>
          <Button component={Link} to="/" color="inherit">Inicio</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          <Button component={Link} to="/admin" color="inherit">Admin</Button>
          <AuthDetails />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Menu;
