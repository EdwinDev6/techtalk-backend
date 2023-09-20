import Post from "../models/Post.js";
import {uploadImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    
    const post = await Post.findById(req.params.postId);
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const updatePost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const removePost = async (req, res) => {

  const {postId}=req.params;

  await Post.findByIdAndDelete(postId);
  res.status(204).json();
  
}