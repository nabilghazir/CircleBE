export interface LoginDTO {
    username: string;
    password: string;
}

export interface RegisterDTO {
    fullname: string;
    email: string;
    password: string;
    username?: string;
}

export interface ForgotPassword {
    email: string;
}

export interface ResetPassword {
    token: string;
    password: string;
}

export interface UpdateUserDTO {
    username?: string;
    email?: string;
    password?: string;
}







