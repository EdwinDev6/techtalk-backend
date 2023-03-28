import { Router } from 'express';
import postCtrl from '../controllers/post.controller.js';
import { verifyToken, isModerator, isAdmin } from '../middlewares/authJwt.js';

const router = Router();

router.post('/', verifyToken, isModerator, isAdmin, postCtrl.createPost);

router.get('/', postCtrl.getPost);

router.get('/:postId', postCtrl.getPostById);

router.put('/:postId', verifyToken, isModerator, postCtrl.updatePostById);

router.delete('/:postId', verifyToken, isAdmin, postCtrl.deletePostById);

export default router;