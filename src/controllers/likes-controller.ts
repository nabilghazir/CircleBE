import { Request, Response, NextFunction } from 'express'
import * as likesServices from '../services/likes-service'

export const createLike = async (req: Request, res: Response) => {
    try {
        const fetchUserId = res.locals.user.id
        const fetchThreadId = +req.body.threadId

        const liked = await likesServices.createLike(fetchUserId, fetchThreadId)

        res.json({
            message: liked
        })

    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const checkLikes = async (req: Request, res: Response) => {
    try {
        const fetchingUserId = res.locals.user.id
        const fetchingThreadId = +req.params.threadId

        const checkFollow = await likesServices.likesCheck(fetchingUserId, fetchingThreadId)

        res.json({
            isLiked: !!checkFollow
        })

    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}