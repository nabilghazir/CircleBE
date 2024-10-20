import { Router } from "express";
import * as authController from "../controllers/auth-controller";
import { authentication } from "../middlewares/authentication";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/auth-check", authentication, authController.authCheck);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password/:token", authController.resetPassword);

export default authRouter;
