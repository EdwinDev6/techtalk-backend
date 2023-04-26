import { Router } from 'express';
import {getPost, getPosts ,createPost, updatePost, removePost} from '../controllers/post.controller.js';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.post('/',  createPost);

router.get('/', getPosts);

router.get('/:postId', getPost);

router.put('/:postId',  updatePost);

router.delete('/:postId',  removePost);

export default router;