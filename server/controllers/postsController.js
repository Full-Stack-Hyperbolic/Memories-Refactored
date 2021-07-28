import MemoryPost from '../models/postModel.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const allPosts = await MemoryPost.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const postData = req.body;
  const newPost = new MemoryPost(postData);

  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log('Post saved');
  } catch (error) {
    res.status(409).json({ message: errory.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that Id found.');
  }

  await MemoryPost.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  console.log('Logging ID from controller = ', id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id found.');
  }

  try {
    await MemoryPost.findByIdAndRemove(id);
    console.log('Successfully Deleted Post');
  } catch (error) {
    console.log(error.message);
  }

  res.json(id);
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  req.userId;

  // check if the ID passed in is a valid mongodb _id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that ID found');
  }

  // Get the original post state
  const post = await MemoryPost.findById(id);

  // check if this person liked the post already
  const index = post.likes.findIndex(id => id === String(req.userId));

  // only if their id is not in the above line
  if (index === -1) {
    // like the post - by pushinig id
    post.likes.push(req.userId);
  } else {
    // dislike a post - by removing id (returninig all but the one that equals passed in id)
    post.likes = post.likes.filter(id => id !== String(req.userId));
  }

  // Update it and return
  const updatedPost = await MemoryPost.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
