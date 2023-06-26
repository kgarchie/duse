import {UserState} from "~/types";

export const useUser = () => useState<UserState | null>('user', () => null)