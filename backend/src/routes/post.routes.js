import { Router } from 'express';
import {getPost, getPosts ,createPost, updatePost, removePost} from '../controllers/post.controller.js';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.post('/',verifyToken, isAdmin,  createPost);

router.get('/', getPosts);

router.get('/:postId', getPost);

router.put('/:postId', isAdmin, updatePost);

router.delete('/:postId', isAdmin, removePost);

export default router;