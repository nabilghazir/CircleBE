import { Request, Response, NextFunction } from 'express'
import * as followService from '../services/follow-service'

export const createFollow = async (req: Request, res: Response) => {
    try {
        const fetchFollowerId = res.locals.user.id
        const fetchFollowingId = +req.body.followingId

        const followed = await followService.createFollow(fetchFollowerId, fetchFollowingId)


        res.json({
            message: followed
        })

    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const checkFollow = async (req: Request, res: Response) => {
    try {
        const fetchingFollowerId = res.locals.user.id
        const fetchingFollowingId = +req.params.followingId

        const checkFollow = await followService.checkFollow(fetchingFollowerId, fetchingFollowingId)

        res.json({
            isFollowing: !!checkFollow
        })
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}