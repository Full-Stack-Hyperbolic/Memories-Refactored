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
