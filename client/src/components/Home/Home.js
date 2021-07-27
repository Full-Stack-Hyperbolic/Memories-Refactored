import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../state/slices/postsSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Re-rendering App.js');
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
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
  );
};

export default Home;
