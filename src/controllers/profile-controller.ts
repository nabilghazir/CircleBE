import { Request, Response } from "express";
import * as profileService from "../services/profile-service"
import { UpdateProfileDTO } from "../dto/profile-dto";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const fetchingUsername = req.params.username

        const getProfile = await profileService.getProfile(fetchingUsername)

        res.json(getProfile)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const fetchingId = res.locals.user.id
        const fetchingData: UpdateProfileDTO = req.body

        if (req.files) {
            const files = req.files as { [key: string]: Express.Multer.File[] }
            Object.keys(files).map((key) => {
                fetchingData[key] = files[key]
            })
        }

        const updateProfile = await profileService.updateProfile(fetchingData, fetchingId)

        res.json({
            message: updateProfile
        })
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}