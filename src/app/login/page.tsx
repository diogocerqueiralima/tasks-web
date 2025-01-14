'use client'

import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export default function Login() {

    const authContext = useContext(AuthenticationContext)

    if (!authContext)
        return

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        if (code) {
            authContext.finishAuthentication(code)
        }

    }, [])

    return (

        <></>

    )

}