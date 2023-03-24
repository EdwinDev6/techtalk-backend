
import { Router } from "express";
const postCtrl = require('../controllers/post.controller')
const Token = require('../middlewares/authJwt')

const router = Router();

router.post("/",Token.verifyToken,Token.isModerator,Token.isAdmin, postCtrl.createPost);

router.get("/", postCtrl.getPost);

router.get("/:postId", postCtrl.getPostById);

router.put("/:postId",Token.verifyToken,Token.isModerator,  postCtrl.updatePostById);

router.delete("/:postId",Token.verifyToken,Token.isAdmin,  postCtrl.deletePostById);

export default router;
