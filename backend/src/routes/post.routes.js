import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  removePost,
  createComment,
} from "../controllers/post.controller.js";
import { verifyToken, isModerator } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getPosts);

router.post("/", verifyToken, isModerator, createPost);

router.get("/:postId", getPost);

router.delete("/:postId", verifyToken, isModerator, removePost);

router.post("/:postId/comments", verifyToken, createComment);

router.put("/:postId", verifyToken, isModerator, updatePost);

export default router;
