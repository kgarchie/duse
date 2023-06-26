import {LoginCredentials, RegisterCredentials, RegistrationError, UserState} from "~/types";
import db from "~/db/db";
import {H3Event} from "h3";
import {hashPassword, readBearerToken, verifyPassword} from "~/mvc/auth/helpers";
import {v4 as uuidv4} from "uuid";
import {User, users} from "~/db/schema/user";
import {tokens} from "~/db/schema/token";
import {ulid} from "ulid";
import {and, eq, sql} from "drizzle-orm";
import {mailResetPasswordLink} from "~/mvc/utils";

export async function loginUser(data: LoginCredentials, bearer: string | null = null): Promise<UserState | null> {
    const result = await db.select({
        user_id: users.user_id,
        name: users.name,
        email: users.email,
        password: users.password,
        isAdmin: users.isAdmin
    }).from(users).where(eq(users.email, data.email))
        .catch((e) => {
            throw e as Error
        })

    if (result.length < 1) return null

    const user = result[0]
    if (!verifyPassword(data.password, user.password)) return null

    if (bearer) revokeToken(bearer)

    const newToken = await generateNewBearerToken(user.user_id)
        .catch((e) => {
            throw e as Error
        })

    let userState = {} as UserState
    userState.user_id = user.user_id
    userState.name = user.name!
    userState.email = user.email!
    userState.is_admin = user.isAdmin!
    userState.bearer = newToken

    return userState
}

async function generateNewBearerToken(user_id: string): Promise<string> {
    const token = uuidv4()

    await db.insert(tokens).values({
        token: token,
        user_id: user_id
    }).catch((e) => {
        throw e
    })

    return token
}

export async function registerUser(data: RegisterCredentials): Promise<UserState | Error> {
    async function getOrCreateUser() {
        let _user = await getUserByUserId(data.user_id)
        if (!_user?.isEphemeral) throw new Error("User already exists")

        if (!_user) _user = await createEphemeralUser()

        return _user
    }

    const user = await getOrCreateUser()
        .catch((e) => {
            throw e as Error
        })

    if (!user) return new Error("User not found")

    await db.update(users).set({
        isEphemeral: false,
        name: data.name,
        password: hashPassword(data.password),
        email: data.email
    }).where(eq(users.user_id, user.user_id))
        .catch((e) => {
            throw e as Error
        })

    return await getUserByUserId(user.user_id).catch(
        (e) => {
            throw e
        }) as UserState
}

async function getUserByUserId(user_id: string): Promise<User & UserState | null> {
    const result = await db.select({
        user_id: users.user_id,
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin,
        isEphemeral: users.isEphemeral
    }).from(users).where(eq(users.user_id, user_id))
        .catch((e) => {
            throw e
        })

    if (result.length < 1) return null

    const user = result[0]

    let userState = {} as User & UserState
    userState.user_id = user.user_id
    userState.name = user.name!
    userState.email = user.email!
    userState.is_admin = user.isAdmin!
    userState.isEphemeral = user.isEphemeral!

    return userState
}

async function createEphemeralUser(): Promise<User & UserState | null> {
    const bearer = uuidv4()
    let user_id = ulid()
    let user = {} as User & UserState

    await db.insert(users).values({
        user_id: user_id,
        isEphemeral: true
    }).catch(
        (e) => {
            throw e as Error
        })

    await db.insert(tokens).values({
        token: bearer,
        user_id: user_id
    }).catch(
        (e) => {
            throw e as Error
        })

    // Because this is mySql, we can't yet return a table after insert using drizzle-orm yet, use Postgres for that
    // TODO: Consider using Postgres for this project
    const result = await db.select({
        user_id: users.user_id,
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin,
        isEphemeral: users.isEphemeral
    }).from(users)
        .where(eq(users.user_id, user_id))
        .limit(1)
        .catch(
            (e) => {
                throw e
            })

    if (!result) return null

    user.user_id = result[0].user_id
    user.name = result[0].name!
    user.email = result[0].email!
    user.bearer = bearer
    user.is_admin = result[0].isAdmin!
    user.isEphemeral = result[0].isEphemeral!

    return user
}

async function getUserFromBearerToken(bearer: string): Promise<UserState | null> {
    let userState = {} as UserState
    const result = await db.select({
        user_id: users.user_id,
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin
    }).from(users)
        .innerJoin(tokens, eq(tokens.user_id, users.user_id))
        .where(and(eq(tokens.isValid, true), eq(tokens.token, bearer)))

    if (!result || result.length === 0) return null

    userState.user_id = result[0].user_id
    userState.name = result[0].name!
    userState.email = result[0].email!
    userState.is_admin = result[0].isAdmin!
    userState.bearer = bearer

    return userState
}

export async function identifyUser(event: H3Event): Promise<UserState | null> {
    let bearer = readBearerToken(event)
    if (Array.isArray(bearer)) throw new Error("Invalid headers | More than one bearer token")
    if (!bearer) return await createEphemeralUser()

    return await getUserFromBearerToken(bearer)
}


export async function logoutUser(event: H3Event): Promise<boolean> {
    let bearer = readBearerToken(event)
    if (Array.isArray(bearer)) return false
    if (!bearer) return false

    await db.update(tokens).set({
        isValid: false
    }).where(eq(tokens.token, bearer))
        .catch((e) => {
            throw e as Error
        })

    return true
}

async function resetUserTokens(user_id: string): Promise<boolean> {
    await db.update(tokens).set({
        isValid: false
    }).where(eq(tokens.user_id, user_id))
        .catch((e) => {
            throw e
        })

    return true
}

export async function getUserByEmail(email: string): Promise<UserState | null> {
    const result = await db.select({
        user_id: users.user_id,
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin
    }).from(users).where(eq(users.email, email))
        .limit(1)
        .catch((e) => {
            throw e
        })

    if (!result) return null

    let userState = {} as UserState
    userState.user_id = result[0].user_id
    userState.name = result[0].name!
    userState.email = result[0].email!
    userState.is_admin = result[0].isAdmin!

    return userState
}

async function checkTokenValidity(token: string, user_id: string): Promise<boolean> {
    const result = await db.select({
        isValid: tokens.isValid
    }).from(tokens).where(and(eq(tokens.token, token), eq(tokens.user_id, user_id)))
        .limit(1)
        .catch((e) => {
            throw e
        })

    if (!result) return false

    return result[0].isValid || false
}

async function revokeToken(token: string) {
    await db.update(tokens).set({
        isValid: false
    }).where(eq(tokens.token, token))
        .catch((e) => {
            throw e
        })

    return true
}

export async function updateUserPassword(event: H3Event): Promise<UserState | null> {
    const data = await readBody(event)
    if (!data) throw new Error("Invalid body")

    const user = await getUserByEmail(data.email)
        .catch((e) => {
            throw e as Error
        })
    if (!user) throw new Error("User not found")

    const isValidResetToken = await checkTokenValidity(data.token, user.user_id)
        .catch((e) => {
            throw e as Error
        })
    if (!isValidResetToken) throw new Error("Invalid reset token")

    revokeToken(data.token)

    const result = await db.update(users)
        .set({
            password: hashPassword(data.password)
        }).where(eq(users.user_id, user.user_id))
        .catch((e) => {
            throw e as Error
        })

    if (!result) throw new Error("Failed to update user")

    await resetUserTokens(user.user_id).catch((e) => {
        throw e as Error
    })

    let loginCredentials = {} as LoginCredentials
    loginCredentials.email = user.email
    loginCredentials.password = data.password

    return await loginUser(loginCredentials).catch((e) => {
        throw e as Error
    })
}

export async function requestPasswordReset(event: H3Event): Promise<boolean> {
    const {email, origin} = await readBody(event)
    const user = await getUserByEmail(email)
        .catch((e) => {
            throw e as Error
        })

    if (!user) throw new Error("User not found")

    const token = await generateNewBearerToken(user.user_id)
        .catch((e) => {
            throw new Error("Failed to generate token")
        })

    await mailResetPasswordLink(email, origin, token)
        .catch((e) => {
            throw e as Error
        })

    return true
}