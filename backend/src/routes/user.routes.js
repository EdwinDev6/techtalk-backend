import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.controller.js';
import { checkExistingUser } from '../middlewares/verifySignup.js';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js';

const router = Router();

router.post('/', verifyToken, isAdmin, checkExistingUser, createUser);
router.get('/', getUsers)


export default router;