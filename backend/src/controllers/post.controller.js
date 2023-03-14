import Post from "../models/Post"

export const createPost = (req,res) => {
  console.log(req.body)
  
  res.json("create post")
}

export const getPost = (req,res) => {
  res.json("get post")
}

export const getPostById = (req,res) => {
  res.json("get post by is")
}

export const updatePostById = (req,res) => {
  res.json("update post by id")
}

export const deletePostById = (req,res) => {
  res.json("delete post by id")
}