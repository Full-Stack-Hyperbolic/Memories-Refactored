import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from '../../styles/Auth.Styles';
import {
  Container,
  Button,
  Avatar,
  Paper,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import {
  toggleIsSignUp,
  authUser,
  signIn,
  signUp,
} from '../../state/slices/userSlice';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import Input from './Input';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const isSignUp = useSelector(state => state.user.isSignUp);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleShowPassword = () => setShowPassword(prevState => !prevState);

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      formData,
      history,
    };

    if (isSignUp) {
      console.log('we are at the beginning of it all');
      dispatch(signUp(data));
    } else {
      dispatch(signIn(data));
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    dispatch(toggleIsSignUp());
    handleShowPassword(false);
  };

  const googleSuccess = async res => {
    // Optional chaining operator
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(authUser({ result, token }));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = error => {
    console.log('error = ', error);
    console.log('Google Sign In was unsuccessful. Try again later.');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                {/* Custom input components to reduce repetitive attributes */}
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId='446364375973-oegjvu0k22at5fpkjf6o896rtaghulmk.apps.googleusercontent.com'
            render={renderProps => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up."}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
