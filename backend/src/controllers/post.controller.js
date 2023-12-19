import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Comment from "../models/Comments.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({_id: -1});
    
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, categories, source, author } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({
      title,
      description,
      categories,
      source,
      author,
      image,
    });
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
    const comments = await Comment.find({ _id: { $in: post.comments } });
    post[comments]= comments
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, description, categories, source, author } = req.body;

    const updatedPostData = {
      title,
      description,
      categories,
      source,
      author,
    };

    if (req.files?.image) {
      const post = await Post.findById(postId);
      if (post.image) {
        await deleteImage(post.image.public_id);
      }

      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);

      updatedPostData.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, {
      new: true,
    });

    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removePost = async (req, res) => {
  const { postId } = req.params;

  await Post.findByIdAndDelete(postId);
  res.status(204).json();
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;
    const author = req.cookies.username;

    const comment = new Comment({ text, author });

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not Found" });
    }

    post.comments.push(comment);

    await Promise.all([post.save(), comment.save()]);

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.author !== req.cookies.username) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this comment" });
    }

    comment.text = text;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.author !== req.cookies.username) {
      return res.status(403).json({
        error: "You are not authorized to delete this comment",
      });
    }

    const post = await Post.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    await Comment.findByIdAndDelete(commentId);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = await Comment.find({ _id: { $in: post.comments } });

    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
