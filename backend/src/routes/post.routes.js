import { Router } from "express";
const router = Router()
import * as postController from "../controllers/post.controller";

router.post("/", postController.createPost)

router.get("/", postController.getPost)

router.get("/:postId", postController.getPostById)

router.put("/:postId", postController.updatePostById)

router.delete("/:postId", postController.deletePostById)

export default router;