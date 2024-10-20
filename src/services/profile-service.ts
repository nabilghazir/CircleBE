import { UpdateProfileDTO } from "../dto/profile-dto";
import uploader from "../libs/cloudinary";
import * as userRepositories from "../repositories/user-repo";
import * as profileRepositories from "../repositories/profile-repo";

export const getProfile = async (username: string) => {
    return userRepositories.findUserAndProfile(username)
}

export const updateProfile = async (data: UpdateProfileDTO, id: number) => {
    await Promise.all(
        Object.entries(data).map(async ([key, value]) => {
            if (typeof value !== 'string') {
                const url = (await uploader(value))[0].url

                data[key] = url
            }
        })
    )

    return profileRepositories.updateProfile(data, id)
}