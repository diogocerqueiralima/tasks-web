'use client'

import { AuthenticationContext } from "@/app/context/AuthenticationContext"
import { useContext } from "react"
import styles from "./page.module.css";
import 'boxicons/css/boxicons.min.css';
import Link from "next/link";

export default function Header() {

    const authContext = useContext(AuthenticationContext)

    if (!authContext)
        return

    const headers = [
        { id: "1", name: "Home", icon: "bx bx-home-alt-2", path: "/" },
        { id: "2", name: "Tasks", icon: "bx bx-notepad", path: "/tasks" }
    ]

    return (

        <header className={styles.header}>

            <img src="vercel.svg"></img>
            
            <ul>

                { headers.map(h => <li key={h.id}> <Link href={h.path}><i className={h.icon}></i> <span>{h.name}</span></Link> </li>) }

                { (authContext.isAuthenticated() ? <li onClick={authContext.logout}> <i className="bx bx-user"></i> <span>Logout</span> </li> : <li onClick={authContext.login}> <i className="bx bx-user"></i> <span>Login</span> </li>) }

            </ul>

        </header>

    )

}