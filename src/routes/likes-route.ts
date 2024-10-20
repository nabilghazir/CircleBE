import { Router } from "express";
import { authentication } from "../middlewares/authentication";
import * as likeController from "../controllers/likes-controller";

const likeRouter = Router();

likeRouter.post("/", authentication, likeController.createLike);
likeRouter.get("/:threadId", authentication, likeController.checkLikes);

export default likeRouter;
