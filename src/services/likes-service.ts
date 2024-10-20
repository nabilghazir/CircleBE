import * as likeRepository from '../repositories/likes-repo'

export const createLike = async (userId: number, threadId: number) => {
    const existed = await likeRepository.likesCheck(userId, threadId)

    if (existed) {
        await likeRepository.deleteLikes(userId, threadId)
        return 'Unliked'
    }
    await likeRepository.createLikes(userId, threadId)
    return 'Liked'
}

export const likesCheck = async (userId: number, threadId: number) => {
    return await likeRepository.likesCheck(userId, threadId)
}