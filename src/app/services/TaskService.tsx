import Task from "../domain/Task"

function getAllTasks(token: string): Promise<Task[]> {

    return fetch('http://localhost:8080/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(response => response.data)

}

export const TaskService = {
    getAllTasks
}

export default TaskService