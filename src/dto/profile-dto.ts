export interface UpdateProfileDTO extends Record<string, any> {
    username?: string;
    fullname?: string;
    bio?: string;
    avatar?: string | { [key: string]: Express.Multer.File[] }
    background?: string | { [key: string]: Express.Multer.File[] }
}