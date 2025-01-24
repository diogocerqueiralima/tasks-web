'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import TaskService from '../services/TaskService'
import Task from '../domain/Task'
import Loader from '../components/loader/Loader'
import Toast from '../components/toast/Toast'
import { useRouter } from 'next/navigation'
import TaskItem from '../components/task/TaskItem'
import Pagination from '../components/pagination/Pagination'
import Form, { StringArrayField, StringField } from '../components/form/Form'

export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [viewForm, setViewForm] = useState(false)
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

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const fields = [
        new StringField("title", "text", "bx bxs-baguette", "title", title, setTitle),
        new StringField("description", "text", "bx bx-book", "description", description, setDescription),
        new StringField("deadline", "date", "", "deadline", "2025-01-24", () => {}),
        new StringArrayField("tags", ["Work", "Study"], () => {})
    ]

    return (

        <div className={styles.tasks}>

            { error && !isLoading && <Toast icon='bx bxs-error' message='An unexpected error has occurred' time={5000} removeToast={() => { router.push("/") }} /> }

            { isLoading && <Loader /> }

            { !isLoading && !error && tasks.length > 0 &&

                <Pagination title="My tasks" items={tasks} itemsPerPage={3} renderItem={(item) => <TaskItem task={item} />} onOpen={() => setViewForm(true)} />

            }

            { viewForm &&

                <Form title='Add Task' fields={fields} onClose={() => setViewForm(false)} />

            }

        </div>

    )

}