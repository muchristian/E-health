import express, { Router } from "express";
import authController from "../../controllers/authController";
const authRouter = express.Router();
const { login, signup } = authController;

authRouter.post("/login", login);
authRouter.post("/signup", signup);

export default authRouter;
