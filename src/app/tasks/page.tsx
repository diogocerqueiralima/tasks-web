'use client'

import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import styles from './page.module.css'
import TaskService from '../services/TaskService'
import Task from '../domain/Task'
import Loader from '../components/loader/Loader'
import Toast from '../components/toast/Toast'
import { useRouter } from 'next/navigation'
import TaskItem from '../components/task/TaskItem'
import Pagination from '../components/pagination/Pagination'

export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {

        TaskService.getAllTasks()
            .then(data => {
                setTasks(data)
                setIsLoading(false)
            })
            .catch(() => {
                setError(true)
                setIsLoading(false)
            })

    }, [])

    return (

        <div className={styles.tasks}>

            { error && !isLoading && <Toast icon='bx bxs-error' message='An unexpected error has occurred' time={5000} removeToast={() => { router.push("/") }} /> }

            { isLoading && <Loader /> }

            { !isLoading && !error &&

                <Pagination items={tasks} itemsPerPage={5} renderItem={(item) => <TaskItem task={item} />} />

            }

        </div>

    )

}