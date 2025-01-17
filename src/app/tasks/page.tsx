'use client'

import { useContext, useEffect, useState } from 'react'
import Header from '../components/header/Header'
import styles from './page.module.css'
import { AuthenticationContext } from '../context/AuthenticationContext'
import TaskService from '../services/TaskService'
import Task from '../domain/Task'

export default function Tasks() {

    const authContext = useContext(AuthenticationContext)

    if (authContext == null)
        return

    useEffect(() => {

        if (!authContext.isAuthenticated)
            window.location.href = "/"

    }, [])

    const session = authContext.session

    if (session == null)
        return

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        TaskService.getAllTasks(session.access_token)
            .then(data => {
                setTasks(data)
                setIsLoading(false)
                console.log(data)
            })

    }, [])

    return (

        <div>

            <Header />

            { isLoading && <p>Loading...</p> }

            { !isLoading &&

                <ul>

                    { tasks.map(task => <li> { task.title } </li> ) }

                </ul>

            }

        </div>

    )

}