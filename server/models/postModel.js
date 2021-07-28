import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  createdOn: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const MemoryPost = new mongoose.model('MemoryPost', PostSchema);

export default MemoryPost;
