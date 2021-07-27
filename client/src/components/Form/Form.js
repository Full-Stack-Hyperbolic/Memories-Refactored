import React, { useState, useEffect } from 'react';
import useStyles from '../../styles/Form.Styles';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedPost,
  updatePost,
  createPost,
} from '../../state/slices/postsSlice';

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPost = useSelector(state => state.memoryPosts.selectedPost);
  const posts = useSelector(state => state.memoryPosts.posts);

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    console.log('Re-rendering Form.js');
    if (selectedPost) setPostData(selectedPost);
  }, [posts, selectedPost]);

  const handleSubmit = e => {
    e.preventDefault();
    selectedPost
      ? dispatch(updatePost({ id: selectedPost._id, updatedPost: postData }))
      : dispatch(createPost(postData));
    clear();
  };

  const clear = () => {
    dispatch(setSelectedPost(null));
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {selectedPost ? 'Edit an existing' : 'Create a new'} Memory
        </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          required
          value={postData.creator}
          // Spread the postData before setting the creator: to e.target.value
          onChange={e => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          required
          value={postData.title}
          // Spread the postData before setting the title: to e.target.value
          onChange={e => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          required
          value={postData.message}
          // Spread the postData before setting the message: to e.target.value
          onChange={e => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          required
          value={postData.tags}
          // Spread the postData before setting the tags: to e.target.value
          onChange={e =>
            setPostData({
              ...postData,
              tags: e.target.value.split(', '),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
