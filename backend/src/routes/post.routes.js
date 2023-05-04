import { Router } from 'express';
import {getPost ,createPost, updatePost, removePost, getPostsLimit} from '../controllers/post.controller.js';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.post('/', verifyToken,isModerator, createPost);

router.get('/',  getPostsLimit);

router.get('/:postId', getPost);

router.put('/:postId',verifyToken,isModerator,  updatePost);

router.delete('/:postId',verifyToken, isAdmin,  removePost);

export default router;