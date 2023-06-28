import {H3Event, defineEventHandler} from "h3";
import {login, register, identity, logout, updatePassword, requestReset} from "~/mvc/auth/methods";

const router = createRouter();

router.post("/login", defineEventHandler(async (event: H3Event) => {
    return await login(event)
}));

router.post("/register", defineEventHandler(async (event: H3Event) => {
    return await register(event)
}));

router.get('/identity', defineEventHandler(async (event: H3Event) => {
    return await identity(event)
}));

router.get('/logout', defineEventHandler(async (event: H3Event) => {
    return await logout(event)
}));

router.post('/updatePassword', defineEventHandler(async (event: H3Event) => {
    return await updatePassword(event)
}));

router.post('/resetPassword', defineEventHandler(async (event: H3Event) => {
    return await requestReset(event)
}));

export default useBase('/api/auth', router.handler)