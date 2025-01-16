'use client'

import { AuthenticationContext } from "@/app/context/AuthenticationContext"
import { useContext, useState } from "react"
import styles from "./page.module.css";
import 'boxicons/css/boxicons.min.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "../toast/Toast";

export default function Header() {

    const authContext = useContext(AuthenticationContext)

    if (!authContext)
        return

    const [showToast, setShowToast] = useState(false)
    const router = useRouter()
    const navigateToTasks = () => {

        if (!authContext.isAuthenticated()) {
            setShowToast(true)
            return
        }

        router.push("/tasks")
    }

    return (

        <header className={styles.header}>

            { showToast && <Toast message="You need to log in to an account" icon="bx bx-info-circle" time={5000} removeToast={() => { setShowToast(false) }} /> }

            <img src="logo.webp"></img>
            
            <ul>

                <li> <Link href="/"> <i className="bx bx-home-alt-2" /> <span>Home</span> </Link> </li>

                <li onClick={navigateToTasks}> <i className="bx bx-notepad" /> <span>Tasks</span> </li>

                { (authContext.isAuthenticated() ? <li onClick={authContext.logout}> <i className="bx bx-user"></i> <span>Logout</span> </li> : <li onClick={authContext.login}> <i className="bx bx-user"></i> <span>Login</span> </li>) }

            </ul>

        </header>

    )

}