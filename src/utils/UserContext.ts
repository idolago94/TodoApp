import { createContext } from "react"
import { User } from "@react-native-google-signin/google-signin"

type UserContextType = {
    user: User | null,
    logout: Function
}

export const UserContext = createContext<UserContextType>({ user: null, logout: () => { } })