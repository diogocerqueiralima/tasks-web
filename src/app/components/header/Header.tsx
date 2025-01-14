'use client'

import { AuthenticationContext } from "@/app/context/AuthenticationContext"
import { useContext } from "react"
import styles from "./page.module.css";

export default function Header() {

    const authContext = useContext(AuthenticationContext)

    if (!authContext)
        return

    const headers = [
        { id: "1", name: "Home" },
        { id: "2", name: "Tasks" }
    ]

    return (

        <header className={styles.header}>

            <img src="vercel.svg"></img>
            
            <ul>

                { headers.map(h => <li key={h.id}> {h.name} </li>) }

                { (authContext.isAuthenticated() ? <li onClick={authContext.logout}>Logout</li> : <li onClick={authContext.login}>Login</li>) }

            </ul>

        </header>

    )

}