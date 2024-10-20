import * as followRepositories from '../repositories/follow-repo'

export const createFollow = async (followerId: number, followingId: number) => {
    const exist = await followRepositories.followCheck(followerId, followingId)

    if (exist) {
        await followRepositories.deleteFollow(followerId, followingId)
        return 'Unfollowed'
    }

    await followRepositories.createFollow(followerId, followingId)
    return 'Followed'
}

export const checkFollow = async (followerId: number, followingId: number) => {
    return await followRepositories.followCheck(followerId, followingId)
}