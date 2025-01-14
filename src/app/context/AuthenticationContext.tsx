'use client'

import { createContext } from "react"

interface Session {

    access_token: string
    expires_in: number

}

interface AuthenticationProps {

    isAuthenticated: () => boolean
    login: () => void
    logout: () => void
    finishAuthentication: (code: string) => void,
    session: Session | null

}

export const AuthenticationContext = createContext<AuthenticationProps | null>(null)