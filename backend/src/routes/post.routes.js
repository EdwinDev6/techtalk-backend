
import { Router } from 'express';
import {getPost, getPosts ,createPost, updatePost, removePost,createComment} from '../controllers/post.controller.js';
import { verifyToken,  isModerator} from '../middlewares/authJwt.js';


const router = Router();

router.post("/", verifyToken, isAdmin, createPost);


router.get("/", getPosts);

router.post('/',verifyToken, isModerator,  createPost);


router.get("/:postId", getPost);

router.put("/:postId", verifyToken, isAdmin, updatePost);


router.delete("/:postId", verifyToken, isModerator, removePost);

router.post("/:postId/comments", verifyToken, createComment);

router.put('/:postId',verifyToken, isModerator, updatePost);

router.delete('/:postId',verifyToken, isModerator, removePost);


export default router;
