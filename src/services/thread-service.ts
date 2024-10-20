import { CreateThreadDTO } from '../dto/thread-dto'
import * as threadRepository from '../repositories/thread-repo'

export const createThread = async (body: CreateThreadDTO) => {
    return await threadRepository.createThread(body)
}

export const getThread = async (id: number) => {
    return await threadRepository.getThreadById(id)
}

export const getThreads = async () => {
    return
}

export const getThreadsByLoggedInUser = async (userId: number, skip: number) => {
    return await threadRepository.findThreadByFollowerId(userId, skip)
}