import { Router } from 'express';
import {getPost, getPosts ,createPost, updatePost, removePost} from '../controllers/post.controller.js';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.post('/', verifyToken, isAdmin, createPost);

router.get('/', getPosts);

router.get('/:postId', getPost);

router.put('/:postId', verifyToken, isAdmin, updatePost);

router.delete('/:postId', verifyToken, isAdmin, removePost);

export default router;