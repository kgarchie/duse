import {LoginCredentials, RegisterCredentials} from "~/types";
import {z} from "zod";
import {H3Event} from "h3";
import * as crypto from "crypto";

export function cleanLoginCredentials(data: LoginCredentials | null): LoginCredentials | null {
    if (!data || !data.email || !data.password) return null

    data.email = data.email.trim().toLowerCase()
    data.password = data.password.trim()

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })

    try {
        schema.parse(data)
        return data
    } catch (e) {
        return null
    }
}

export function cleanRegisterCredentials(data: RegisterCredentials): RegisterCredentials | null {
    if (!data || !data.email || !data.password || !data.bearer) return null

    data.email = data.email.trim().toLowerCase()
    data.password = data.password.trim()
    data.phone = data.phone?.trim()
    data.name = data.name?.trim()

    if(!data.name || data.name.length < 1) data.name = data.email.split("@")[0].replace(".", " ").trim()

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        bearer: z.string(),
        user_id: z.string().min(8),
        phone: z.string().optional(),
        name: z.string()
    })

    try {
        schema.parse(data)
        return data
    } catch (e) {
        console.log(e)
        return null
    }
}


export function readBearerToken(event:H3Event){
    const bearer = event.node.req.headers['bearer'] || null
    if(!bearer || bearer.length < 1 || typeof bearer !== 'string') return null
    return bearer
}

export function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return `${salt}:${hash}`
}

export function verifyPassword(password: string | null, hash: string | null): boolean {
    if (!password || !hash) return false
    const [salt, key] = hash.split(':')
    const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return key === verify
}