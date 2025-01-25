'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import TaskService from '../services/TaskService'
import Task, { Tag } from '../domain/Task'
import Loader from '../components/loader/Loader'
import Toast from '../components/toast/Toast'
import { useRouter } from 'next/navigation'
import TaskItem from '../components/task/TaskItem'
import Pagination from '../components/pagination/Pagination'
import Form, { StringArrayField, StringField } from '../components/form/Form'

export default function Tasks() {

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [viewForm, setViewForm] = useState(false)
    const router = useRouter()

    useEffect(() => {

        TaskService.getAllTasks()
            .then(data => {
                setTasks(data)
                setIsLoading(false)
            })
            .catch(() => {
                setErrorMessage("An unexpected error has occurred.")
                setError(true)
                setIsLoading(false)
            })

    }, [])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [errorForm, setErrorForm] = useState(false)

    const fields = [
        new StringField("title", "text", "bx bxs-baguette", "title", title, setTitle),
        new StringField("description", "text", "bx bx-book", "description", description, setDescription),
        new StringField("deadline", "date", "", "deadline", date, setDate),
        new StringArrayField("tags", tags, Object.values(Tag), setTags)
    ]

    function onSave() {

        if (!title.trim() || !description.trim()) {
            setErrorMessage("The title or description cannot be blank.")
            setErrorForm(true)
            return
        }

        const today = new Date();
        const selectedDate = new Date(date);

        if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
            setErrorMessage("Please select a valid date that is later than today.")
            setErrorForm(true)
            return
        }

        if (tags.length == 0) {
            setErrorMessage("Please provide at least one tag.")
            setErrorForm(true)
            return
        }

        TaskService.createTask(title, description, date, tags)
        .catch(() => {
            setErrorMessage("An unexpected error has occurred.")
            setErrorForm(true)
        })

    }

    return (

        <div className={styles.tasks}>

            { error && !isLoading && <Toast icon='bx bxs-error' message={errorMessage} time={5000} removeToast={() => { router.push("/") }} /> }

            { errorForm && !isLoading && <Toast icon='bx bxs-error' message={errorMessage} time={5000} removeToast={() => { setErrorForm(false) }} /> }

            { isLoading && <Loader /> }

            { !isLoading && !error && tasks.length > 0 &&

                <Pagination title="My tasks" items={tasks} itemsPerPage={3} renderItem={(item) => <TaskItem task={item} />} onOpen={() => setViewForm(true)} />

            }

            { viewForm &&

                <Form title='Add Task' fields={fields} onClose={() => setViewForm(false)} onSave={onSave} />

            }

        </div>

    )

}