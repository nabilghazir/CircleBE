import { NextFunction, Request, Response } from 'express'
import * as authService from '../services/auth-service'
import * as profileService from '../services/profile-service'
import { LoginDTO, RegisterDTO } from '../dto/auth-dto'

export const register = async (req: Request, res: Response) => {
    try {
        const fetchingDataForRegister = req.body as RegisterDTO;

        console.log(fetchingDataForRegister);


        const user = await authService.register(fetchingDataForRegister);

        res.json({
            user
        });
    } catch (error) {
        console.error(error);

        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchDataForLogin = req.body as LoginDTO

        const token = await authService.login(fetchDataForLogin)

        res.json({
            token
        })
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchingUser = res.locals.user

        const profile = await profileService.getProfile(fetchingUser.username)

        res.json(profile)
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const fetchingEmail = req.body.email

        await authService.forgotPassword(fetchingEmail)

        res.json({
            message: "Reset password link has sent to your email."
        })

    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const fetchingToken = req.params.token

        const fetchingPassword = req.body.password

        await authService.resetPassword(fetchingToken, fetchingPassword)

        res.json({
            message: "Password changed successfully."
        })
    } catch (error) {
        console.log(error)

        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}