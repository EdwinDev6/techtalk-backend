import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  removePost,
  createComment,
} from "../controllers/post.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.post("/", verifyToken, isAdmin, createPost);

router.get("/", getPosts);

router.get("/:postId", getPost);

router.put("/:postId", verifyToken, isAdmin, updatePost);

router.delete("/:postId", verifyToken, isAdmin, removePost);

router.post("/:postId/comments", verifyToken, createComment);

export default router;
