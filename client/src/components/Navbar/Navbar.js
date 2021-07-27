import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from '../../styles/Navbar.Styles';
import memories from '../../images/memories.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../state/slices/userSlice';

const Navbar = () => {
  const classes = useStyles();
  // Set the local state from localStorage to get avatar and username
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    // check if the token exists
    const token = user?.token;

    // check for JWT for manual sign-up

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          Memories
        </Typography>
        <img
          className={classes.className}
          src={memories}
          alt='memories'
          height='60'
          style={{ marginLeft: '1.5rem' }}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {/* logic: IF the user is logged in vs if they are not */}
        {user ? (
          // If we ARE logged in:
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
            >
              Logout
            </Button>
          </div>
        ) : (
          // If we're NOT logged in:
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
