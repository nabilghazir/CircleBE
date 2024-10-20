import { prisma } from "../libs/prisma";

export const createLikes = async (userId: number, threadId: number) => {
    return await prisma.likes.create({
        data: {
            userId,
            threadId
        }
    })
}

export const deleteLikes = async (userId: number, threadId: number) => {
    return await prisma.likes.delete({
        where: {
            threadId_userId: {
                threadId,
                userId
            }
        }
    })
}

export const likesCheck = async (userId: number, threadId: number) => {
    return await prisma.likes.findUnique({
        where: {
            threadId_userId: {
                threadId,
                userId
            }
        }
    })
}