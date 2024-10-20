import { Router } from 'express'
import authRouter from './auth-route';
import followRouter from './follow-route';
import likeRouter from './likes-route';
import profileRouter from './profile-route';
import threadRouter from './thread-route';
import userRouter from './user-route';

const router = Router();

router.get('/', (req, res) => {
    res.send('ROOT ROUTER Express APP')
});

router.use("/auth", authRouter)
router.use("/follow", followRouter)
router.use("/like", likeRouter)
router.use("/profile", profileRouter)
router.use("/thread", threadRouter)
router.use("/user", userRouter)

export default router