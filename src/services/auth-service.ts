import { LoginDTO, RegisterDTO } from "../dto/auth-dto";
import { prisma } from "../libs/prisma";
import * as userRepositories from "../repositories/user-repo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "./send-email-service";


export const register = async (RegisterData: RegisterDTO) => {
    const existedUserCheck = await userRepositories.findExistingUsernameOrEmail(RegisterData.username!);
    if (existedUserCheck) {
        throw new Error("User already exists");
    }

    if (!RegisterData.password) {
        throw new Error("Password is required");
    }

    console.log('Password before hashing:', RegisterData.password);


    const hashedPassword = await bcrypt.hash(RegisterData.password, 10);
    const generatedUsername = RegisterData.email.split("@")[0];

    const createdUser = userRepositories.createUser({
        ...RegisterData,
        username: generatedUsername,
        password: hashedPassword
    })

    return createdUser
}

export const login = async (loginData: LoginDTO) => {
    const user = await userRepositories.findExistingUsernameOrEmail(loginData.username);

    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(loginData.password, user.password);

    if (!isValidPassword) {
        throw new Error("Email/password is incorrect");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET || "fhuiuad!biHAgfbashdbuBDAuhfifahui2139&^$jDU)Jjd*319DS*&@)djsadi",
        {
            expiresIn: "1d"
        }
    )

    return token
}

export const forgotPassword = async (email: string) => {
    const user = await userRepositories.findExistingUsernameOrEmail(email)
    if (!user) {
        throw new Error('User not found')
    }

    const token = jwt.sign(
        {
            email: user.email
        },
        process.env.JWT_SECRET || 'jifioqahdiwaio!jdoi2123k1',
        {
            expiresIn: '1d'
        }
    )

    await sendEmail(email, token)

    return 'success'
}

export const resetPassword = async (token: string, password: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jifioqahdiwaio!jdoi2123k1')
    if (!decoded) {
        throw new Error('Invalid token')
    }

    const user = await userRepositories.findExistingUsernameOrEmail((decoded as any).email)
    if (!user) {
        throw new Error('User not found')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await userRepositories.updateUser(user.id, {
        password: hashedPassword
    })
}
