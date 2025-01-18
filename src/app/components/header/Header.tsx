'use client'

import styles from "./page.module.css";
import 'boxicons/css/boxicons.min.css';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {

    const router = useRouter()
    const navigateToTasks = () => {

        router.push("/tasks")
    }

    return (

        <header className={styles.header}>

            <img src="logo.webp"></img>
            
            <ul>

                <li> <Link href="/"> <i className="bx bx-home-alt-2" /> <span>Home</span> </Link> </li>

                <li onClick={navigateToTasks}> <i className="bx bx-notepad" /> <span>Tasks</span> </li>

            </ul>

        </header>

    )

}