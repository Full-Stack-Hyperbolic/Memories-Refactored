import React, { useEffect } from 'react';
// Fetch the data from the global redux store with Redux 'Selectors'
import useStyles from '../../styles/Posts.Styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector(state => state.memoryPosts.posts);

  useEffect(() => {
    console.log('Re-rendering Posts.js');
    console.log(posts);
  }, [posts]);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map(post => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
