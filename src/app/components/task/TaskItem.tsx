import Task from '@/app/domain/Task'
import styles from './page.module.css'

export default function TaskItem( { task }: { task: Task } ) {

    return (

        <div className={styles.task}>

            <div className={styles.left}>

                <div className={styles.title}>
                    <span>{ task.getEmojiStatus() }</span>
                    <h3>{ task.title }</h3>
                </div>

                <p>
                    Deadline: { task.deadline.toLocaleDateString() } { task.deadline.toLocaleTimeString() }
                </p>

                <p className={styles.description}>
                    { task.description }
                </p>

            </div>

            <div className={styles.right}>

                <button className={styles.steps}>Steps</button>
                <button className={styles.edit}>Edit</button>
                <button className={styles.delete}>Delete</button>

            </div>


        </div>

    )

}