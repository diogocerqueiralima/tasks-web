import Task, { Tag } from '@/app/domain/Task'
import styles from './page.module.css'
import { useState } from 'react'
import Form, { StringArrayField, StringField } from '../form/Form'
import { useTasks } from '@/app/context/TaskContext'

export default function TaskItem( { task }: { task: Task } ) {

    const [viewForm, setViewForm] = useState(false)
    const [titleEdit, setTitleEdit] = useState("")
    const [descriptionEdit, setDescriptionEdit] = useState("")
    const [dateEdit, setDateEdit] = useState("")
    const [tagsEdit, setTagsEdit] = useState<string[]>([])
    const { deleteTask, updateTask } = useTasks();

    function onOpenEdit() {

        setTitleEdit(task.title)
        setDescriptionEdit(task.description)
        setTagsEdit(task.tags)

    }

    const fields = [
        new StringField("title", "text", "bx bxs-baguette", "title", titleEdit, setTitleEdit),
        new StringField("description", "text", "bx bx-book", "description", descriptionEdit, setDescriptionEdit),
        new StringField("deadline", "date", "", "deadline", dateEdit, setDateEdit),
        new StringArrayField("tags", tagsEdit, Object.values(Tag), setTagsEdit)
    ]

    return (

        <div className={styles.task}>

            <div className={styles.left}>

                <div className={styles.title}>
                    <span>{ task.getEmojiStatus() }</span>
                    <h3>{ task.title }</h3>
                </div>

                <p>
                    Deadline: { task.deadline.toLocaleDateString() }
                </p>

                <p className={styles.tags}>
                    <i className='bx bx-purchase-tag'></i>
                    { task.tags.map(tag => <span key={tag}>{ tag.toLowerCase() }</span>) }
                </p>

                <p className={styles.description}>
                    { task.description }
                </p>

            </div>

            <div className={styles.right}>

                <button className={styles.steps}>Steps</button>
                <button onClick={() => { setViewForm(true); onOpenEdit() }} className={styles.edit}>Edit</button>
                <button onClick={() => deleteTask(task.id)} className={styles.delete}>Delete</button>

            </div>

            { viewForm &&

                <Form title='Edit Task' fields={fields} onClose={() => setViewForm(false)} onSave={() => updateTask(task.id, titleEdit, descriptionEdit, dateEdit, tagsEdit)} />

            }


        </div>

    )

}