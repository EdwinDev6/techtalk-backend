import { Router } from 'express';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js';

const router = Router();

router.get('/', verifyToken, isAdmin)


export default router;