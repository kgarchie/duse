import {APIResponse, UserCookie, UserState} from "~/types";

export default defineNuxtPlugin(async () => {
    const user = useUser()
    if (user.value) return

    if (!user.value) {
        const bearer = useCookie<UserCookie>('bearer')
        // console.log(bearer.value)
        const {data: res} = await useFetch('/api/auth/identity', {
            method: 'GET',
            headers: {
                'bearer': bearer?.value?.bearer || ''
            }
        })

        const response = res.value as APIResponse

        if (response && response.statusCode === 200) {
            const userState = response.body as UserState

            user.value = userState
            bearer.value = {bearer: userState.bearer}

            // console.log(response)
        } else {
            alert('User Session Expired | Please login again')
            bearer.value.bearer = ''
            user.value = null

            location.href = '/auth/login'
        }

        // console.log(bearer.value)
    }
})