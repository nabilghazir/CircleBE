import { UpdateProfileDTO } from "../dto/profile-dto";
import { prisma } from "../libs/prisma";

export const updateProfile = async (data: UpdateProfileDTO, id: number) => {
    const { username, ...body } = data

    return await prisma.profile.update({
        where: {
            userId: id
        },
        data: {
            ...body,
            user: {
                update: {
                    username: username
                }
            }
        }
    })
}