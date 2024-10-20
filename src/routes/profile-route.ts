import { Router } from "express";
import * as profileController from "../controllers/profile-controller";
import { authentication } from "../middlewares/authentication";
import upload from "../middlewares/uploadFiles";

const profileRouter = Router();

profileRouter.get("/:username", authentication, profileController.getProfile)

profileRouter.put(
    "/update",
    authentication,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "background",
            maxCount: 1
        }
    ]),
    profileController.updateProfile
)

export default profileRouter