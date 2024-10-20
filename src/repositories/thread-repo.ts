import { CreateThreadDTO } from "../dto/thread-dto";
import { prisma } from "../libs/prisma";

export const createThread = async (createThreadData: CreateThreadDTO) => {
    return await prisma.thread.create({
        data: {
            ...createThreadData,
            mainThreadId: createThreadData.mainThreadId ? +createThreadData.mainThreadId : null,
            images: {
                createMany: {
                    data: createThreadData.images!.map((image) => ({ url: image.url }))
                }
            }
        }
    })
};

export const getThreadById = async (id: number) => {
    return prisma.thread.findUnique({
        where: {
            id
        },
        include: {
            images: true,
            user: {
                select: {
                    id: true,
                    username: true,
                    profile: true
                }
            },
            _count: {
                select: {
                    replies: true,
                    likes: true
                }
            }
        }
    })
}

export const findThreadByFollowerId = async (id: number, skip: number) => {
    return prisma.thread.findMany({
        where: {
            OR: [
                {
                    user: {
                        following: {
                            some: {
                                followerId: id
                            }
                        }
                    }
                },
                {
                    userId: id
                }
            ],
            mainThreadId: null
        },
        include: {
            images: true,
            user: {
                select: {
                    id: true,
                    username: true,
                    profile: true
                }
            },
            _count: {
                select: {
                    replies: true,
                    likes: true
                }
            }
        },
        take: 10,
        skip: skip
    })
}
