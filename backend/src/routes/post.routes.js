import { Router } from 'express';
import {getPost, getPosts ,createPost, updatePost, removePost} from '../controllers/post.controller.js';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.post('/',  createPost);

router.get('/', getPosts);

router.get('/:postId', getPost);

router.put('/:postId', verifyToken, isModerator, updatePost);

router.delete('/:postId', verifyToken, isAdmin, removePost);

export default router;