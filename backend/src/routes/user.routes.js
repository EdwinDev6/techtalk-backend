import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';
import { checkExistingUser } from '../middlewares/verifySignup.js';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js';

const router = Router();

router.post('/', verifyToken, isAdmin, checkExistingUser, createUser);

export default router;