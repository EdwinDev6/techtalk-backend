import { Router } from 'express';
import {getPost, getPosts ,createPost, updatePost, removePost} from '../controllers/post.controller.js';
import { verifyToken,  isModerator} from '../middlewares/authJwt.js';

const router = Router();


router.post('/',verifyToken, isModerator,  createPost);

router.get('/', getPosts);

router.get('/:postId', getPost);

router.put('/:postId',verifyToken, isModerator, updatePost);

router.delete('/:postId',verifyToken, isModerator, removePost);

export default router;