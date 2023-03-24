import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
const Token = require('../middlewares/authJwt')

const router = Router();

router.post("/", Token.verifyToken,Token.isAdmin, checkExistingUser, createUser);

export default router;