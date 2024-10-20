import { Request, Response } from "express";
import * as userServices from "../services/user-service"

export const searchUser = async (req: Request, res: Response) => {
    try {
        const search = req.query.q as string
        const users = await userServices.searchUsers(search)

        res.json(users)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}