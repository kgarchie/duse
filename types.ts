import * as fs from 'fs';

export type LoginCredentials = {
    email: string;
    password: string;
}

export type RegisterCredentials = {
    user_id: string;
    name?: string;
    email: string;
    password: string;
    phone?: string;
    bearer?: string | null;
}

export type RegistrationError = {
    error?: any;
    message: string;
}

export type APIResponse = {
    statusCode: number;
    body?: any;
}

export type UserState = {
    user_id: string;
    email: string;
    name: string;
    is_admin: boolean;
    token: string;
}

export type UserCookie = {
    bearer: string;
}

export type UpdatePasswordRequest = {
    token: string;
    email: string;
    password: string;
}

export type PasswordResetRequest = {
    email: string;
    origin: string;
    path: string;
}

export const TokenType = {
    EMAIL_VERIFICATION: 'email_verification',
    PASSWORD_RESET: 'password_reset',
    BEARER: 'bearer'
}

export function PASSWORD_RESET_TEMPLATE(link: any) {
    const file = fs.readFileSync('./html/password_reset_template.html', 'utf8');
    if (!file) throw new Error('File not found');
    return file.replace('${link}', link);
}
