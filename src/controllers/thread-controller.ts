import { Request, Response } from "express";
import * as threadService from "../services/thread-service"
import { CreateThreadDTO } from "../dto/thread-dto";
import uploader from "../libs/cloudinary";

export const createThread = async (req: Request, res: Response) => {
    try {
        const fetchingData: CreateThreadDTO = req.body

        fetchingData.userId = res.locals.user.id

        if (req.files) {
            fetchingData.images = await uploader(req.files as Express.Multer.File[])
        }

        const createdThread = await threadService.createThread(fetchingData)

        res.json(createdThread)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const getThreads = async (req: Request, res: Response) => {
    try {
        const fetchingThreads = await threadService.getThreads()
        res.json(fetchingThreads)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const detailThread = async (req: Request, res: Response) => {
    try {
        const fetchingId = req.params.id
        const fetchingThread = await threadService.getThread(Number(fetchingId))

        res.json(fetchingThread)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const feed = async (req: Request, res: Response) => {
    try {
        const fetchingUserId = res.locals.user.id
        const skip = req.query.skip ? +req.query.skip : 0
        console.log(skip);

        const fetchingThreads = await threadService.getThreadsByLoggedInUser(fetchingUserId, skip)

        res.json(fetchingThreads)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}