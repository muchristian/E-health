import express, { Router } from 'express';
import authController from '../../controllers/authController';
const authRouter = express.Router();
const { login } = authController;

authRouter.post('/login', login);

export default authRouter;
