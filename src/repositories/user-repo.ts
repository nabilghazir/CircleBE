import { RegisterDTO, UpdateUserDTO } from "../dto/auth-dto";
import { UpdateProfileDTO } from "../dto/profile-dto";
import { prisma } from "../libs/prisma";

export const findExistingUsernameOrEmail = async (usernameOrEmail: string) => {
    return prisma.user.findFirst({
        where: {
            OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        }
    })
}

export const createUser = async (registerData: RegisterDTO) => {
    return prisma.user.create({
        data: {
            username: registerData.username!,
            email: registerData.email,
            password: registerData.password,
            profile: {
                create: {
                    fullname: registerData.fullname
                }
            }
        }
    })
}

export const findUserAndProfile = async (username: string) => {
    return prisma.user.findFirst({
        where: {
            username
        },
        select: {
            id: true,
            username: true,
            email: true,
            profile: true
        }
    })
}

export const searchUsers = async (query: string) => {
    return prisma.user.findMany({
        where: {
            OR: [
                { username: { contains: query } },
                { email: { contains: query } },
                { profile: { bio: { contains: query } } }

            ]
        },
        include: {
            profile: true
        }
        ,
        take: 10
    })
}

export const updateUser = async (id: number, data: Partial<UpdateUserDTO>) => {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })
}