import { Router } from "express";
import { authentication } from "../middlewares/authentication";
import * as userController from "../controllers/user-controller";

const userRouter = Router();

userRouter.get("/search", authentication, userController.searchUser)

export default userRouter