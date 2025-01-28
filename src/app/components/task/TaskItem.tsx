import Task, { Tag } from '@/app/domain/Task'
import styles from './page.module.css'
import TaskService from '@/app/services/TaskService'
import { useState } from 'react'
import Toast from '../toast/Toast'
import Form, { StringArrayField, StringField } from '../form/Form'

export default function TaskItem( { task }: { task: Task } ) {

    const [viewForm, setViewForm] = useState(false)
    const [errorForm, setErrorForm] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [titleEdit, setTitleEdit] = useState("")
    const [descriptionEdit, setDescriptionEdit] = useState("")
    const [dateEdit, setDateEdit] = useState("")
    const [tagsEdit, setTagsEdit] = useState<string[]>([])

    function onOpenEdit() {

        setTitleEdit(task.title)
        setDescriptionEdit(task.description)
        setTagsEdit(task.tags)

    }

    function onEdit() {

        if (!titleEdit.trim() || !descriptionEdit.trim()) {
            setErrorMessage("The title or description cannot be blank.")
            setErrorForm(true)
            return
        }

        const today = new Date();
        const selectedDate = new Date(dateEdit);

        if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
            setErrorMessage("Please select a valid date that is later than today.")
            setErrorForm(true)
            return
        }

        if (tagsEdit.length == 0) {
            setErrorMessage("Please provide at least one tag.")
            setErrorForm(true)
            return
        }

        TaskService.updateTask(task.id, titleEdit, descriptionEdit, dateEdit, tagsEdit)
                .catch(() => {
                    setErrorMessage("An unexpected error has occurred.")
                    setErrorForm(true)
                })

    }

    const fields = [
        new StringField("title", "text", "bx bxs-baguette", "title", titleEdit, setTitleEdit),
        new StringField("description", "text", "bx bx-book", "description", descriptionEdit, setDescriptionEdit),
        new StringField("deadline", "date", "", "deadline", dateEdit, setDateEdit),
        new StringArrayField("tags", tagsEdit, Object.values(Tag), setTagsEdit)
    ]

    return (

        <div className={styles.task}>

            { errorForm && <Toast icon='bx bxs-error' message={errorMessage} time={5000} removeToast={() => { setErrorForm(false) }} /> }

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
                <button onClick={() => TaskService.deleteTask(task.id)} className={styles.delete}>Delete</button>

            </div>

            { viewForm &&

                <Form title='Edit Task' fields={fields} onClose={() => setViewForm(false)} onSave={onEdit} />

            }


        </div>

    )

}