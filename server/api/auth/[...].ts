import {H3Event} from "h3";
import authController from '~/mvc/auth/controller'

export default defineEventHandler((event: H3Event) => {
    return authController(event)
})