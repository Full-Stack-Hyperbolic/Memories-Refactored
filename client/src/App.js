import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
// import hook from react-redux to dispatch an action

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles/App.Styles';
import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from './state/actions/posts';
import { getAllPosts, setIsLoading } from './state/slices/postsSlice';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.memoryPosts.posts);
  const isLoading = useSelector(state => state.memoryPosts.isLoading);

  useEffect(() => {
    console.log('Re-rendering App.js');
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>
          Memories
        </Typography>
        <img
          className={classes.className}
          src={memories}
          alt='memories'
          height='60'
          style={{ marginLeft: '1.5rem' }}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              {/* Bring in custom POSTS component */}
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* Bring in custom FORM component */}
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
