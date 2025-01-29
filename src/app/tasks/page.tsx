'use client'

import { useState } from 'react'
import styles from './page.module.css'
import { Tag } from '../domain/Task'
import Loader from '../components/loader/Loader'
import TaskItem from '../components/task/TaskItem'
import Pagination from '../components/pagination/Pagination'
import Form, { StringArrayField, StringField } from '../components/form/Form'
import { useTasks } from '../context/TaskContext'

export default function Tasks() {


    const { tasks, createTask, isLoading } = useTasks();
    const [viewForm, setViewForm] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [tags, setTags] = useState<string[]>([])

    const fields = [
        new StringField("title", "text", "bx bxs-baguette", "title", title, setTitle),
        new StringField("description", "text", "bx bx-book", "description", description, setDescription),
        new StringField("deadline", "date", "", "deadline", date, setDate),
        new StringArrayField("tags", tags, Object.values(Tag), setTags)
    ]

    const onSave = async () => {

        try {
            await createTask(title, description, date, tags)
            setTitle("")
            setDescription("")
            setDate("")
            setTags([])
            setViewForm(false)
        }catch(e) {}

    }

    return (

        <div className={styles.tasks}>

            { isLoading && <Loader /> }

            { !isLoading &&

                <Pagination title="My tasks" items={tasks} itemsPerPage={3} renderItem={(item) => <TaskItem task={item} />} onOpen={() => setViewForm(true)} />

            }

            { viewForm &&

                <Form title='Add Task' fields={fields} onClose={() => setViewForm(false)} onSave={onSave} />

            }

        </div>

    )

}