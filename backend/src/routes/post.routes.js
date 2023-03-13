import { Router } from "express";
const router = Router()
import * as postController from "../controllers/post.controller";

router.post("/", postController.createPost)

router.get("/", postController.getPost)

router.get("/:postTd", postController.getPostById)

router.put("/", postController.updatePostById)

router.delete("/:", postController.deletePostById)

export default router;