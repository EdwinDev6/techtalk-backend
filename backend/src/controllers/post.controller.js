import Post from "../models/Post.js";

  const createPost = async (req, res) => {
  const { title, content, author, imgURL } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author,
      imgURL,
    });

    const postSaved = await newPost.save();

    res.status(201).json(postSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getPost = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  res.status(200).json(post);
};

const updatePostById = async (req, res) => {
  const updatePost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
};

const deletePostById = async (req, res) => {
  const {postId}=req.params;
  
  await Post.findByIdAndDelete(postId);

  res.status(204).json();
};

module.exports = { createPost,
createPost,
getPost,
getPostById,
updatePostById,
deletePostById}; 