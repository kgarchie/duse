import {H3Event} from "h3";
import {APIResponse, LoginCredentials, RegisterCredentials, UserState} from "~/types";
import {
    loginUser,
    registerUser,
    identifyUser,
    logoutUser,
    updateUserPassword,
    requestPasswordReset
} from "~/mvc/auth/queries";
import {cleanLoginCredentials, cleanRegisterCredentials, readBearerToken} from "~/mvc/auth/helpers";


export async function login(event: H3Event): Promise<APIResponse> {
    const data = await readBody(event) as LoginCredentials || null
    let response = {} as APIResponse


    const cleanedLoginData = cleanLoginCredentials(data)
    if (!cleanedLoginData) {
        response.statusCode = 400
        response.body = "Invalid credentials format"
        return response
    }
    const bearer = readBearerToken(event)
    const result = await loginUser(cleanedLoginData, bearer)
    if (!result) {
        response.statusCode = 401
        response.body = "Invalid credentials"
        return response
    }

    response.statusCode = 200
    response.body = result

    return response
}

export async function register(event: H3Event): Promise<APIResponse> {
    const data = await readBody(event) as RegisterCredentials & { bearer?: string | null }
    data.bearer = readBearerToken(event) || ''
    let response = {} as APIResponse

    const cleanedRegisterData = cleanRegisterCredentials(data)
    if (!cleanedRegisterData) {
        response.statusCode = 400
        response.body = "Invalid credentials format"
        return response
    }

    const result: UserState | Error = await registerUser(cleanedRegisterData)
        .catch((e) => {
            return e as Error
        })

    if (result instanceof Error) {
        response.statusCode = 400
        response.body = result.message
        return response
    }

    response.statusCode = 200
    response.body = result

    return response
}

export async function identity(event: H3Event): Promise<APIResponse> {
    let response = {} as APIResponse

    const result: UserState | Error | null = await identifyUser(event)
        .catch((e) => {
            return e as Error
        })

    if (result instanceof Error) {
        response.statusCode = 401
        response.body = "Internal server error | " + result.message
        return response
    }

    if (!result) {
        response.statusCode = 401
        response.body = "Internal server error"
        return response
    }

    response.statusCode = 200
    response.body = result

    return response
}

export async function logout(event: H3Event): Promise<APIResponse> {
    let response = {} as APIResponse
    const result = await logoutUser(event)
        .catch((e) => {
            console.error(e)
            response.statusCode = 500
            response.body = `Internal server error | ${e.message}`
            return response
        })

    if (!result) {
        response.statusCode = 404
        response.body = "Not found"
        return response
    }

    response.statusCode = 200
    response.body = "Logged out"
    return response
}

export async function updatePassword(event: H3Event): Promise<APIResponse> {
    let response = {} as APIResponse
    const result = await updateUserPassword(event)
        .catch((e) => {
            response.statusCode = 500
            response.body = `Internal server error | ${e.message}`
            return response
        })

    if (!result) {
        response.statusCode = 404
        response.body = "User Not found"
        return response
    }

    response.statusCode = 200
    response.body = "Reset"
    return response
}

export async function requestReset(event: H3Event): Promise<APIResponse> {
    let response = {} as APIResponse
    const result = await requestPasswordReset(event)
        .catch((e) => {
            return e as Error
        })

    if (result instanceof Error) {
        response.statusCode = 400
        response.body = result.message
        return response
    }

    response.statusCode = 200
    response.body = "Reset link sent to email"

    return response
}