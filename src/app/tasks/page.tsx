'use client'

import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import styles from './page.module.css'
import TaskService from '../services/TaskService'
import Task from '../domain/Task'
import Loader from '../components/loader/Loader'

export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        TaskService.getAllTasks()
            .then(data => {
                setTasks(data)
                setIsLoading(false)
            })
            .catch(() => {})

    }, [])

    return (

        <div>

            <Header />

            { isLoading && <Loader /> }

            { !isLoading &&

                <ul>

                    { tasks.map(task => <li key={task.id}> { task.title } </li> ) }

                </ul>

            }

        </div>

    )

}