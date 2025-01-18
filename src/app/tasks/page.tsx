'use client'

import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import styles from './page.module.css'
import TaskService from '../services/TaskService'
import Task from '../domain/Task'

export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        TaskService.getAllTasks()
            .then(data => {
                setTasks(data)
                setIsLoading(false)
                console.log(data)
            })
            .catch(() => {})

    }, [])

    return (

        <div>

            <Header />

            { isLoading && <p>Loading...</p> }

            { !isLoading &&

                <ul>

                    { tasks.map(task => <li key={task.id}> { task.title } </li> ) }

                </ul>

            }

        </div>

    )

}