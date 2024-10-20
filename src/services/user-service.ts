import * as userRepositories from '../repositories/user-repo'

export const searchUsers = async (query: string) => {
    return await userRepositories.searchUsers(query)
}
