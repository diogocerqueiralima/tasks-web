import Task from "../domain/Task"
import TaskDto from "../dto/TaskDto"

function getAllTasks(): Promise<Task[]> {

    return fetch('http://localhost:8080/tasks', {
        redirect: "manual",
        credentials: "include"
    })
        .then(response => {

            if (response.status == 0) {
                window.location.href = "http://localhost:8080"
                return { data: [] }
            }

            return response.json()
        })
        .then((response: { data: TaskDto[] }) => response.data.map(dto => new Task(dto.id, dto.title, dto.description, new Date(dto.created_at), new Date(dto.deadline), dto.steps, dto.status, dto.tags)))

}

function createTask(title: string, description: string, deadline: string, tags: string[]) {

    return fetch('http://localhost:8080/tasks', {
        method: "POST",
        redirect: "manual",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                title,
                description,
                deadline: deadline + "T00:00:00",
                tags
            }
        )
    })
        .then(response => {

            if (response.status == 0) {
                window.location.href = "http://localhost:8080"
                return { data: [] }
            }

            return response.json()
        })
        .then(() => window.location.href = "/tasks")

}

function deleteTask(id: number) {

    return fetch('http://localhost:8080/tasks/' + id, {
        method: "DELETE",
        redirect: "manual",
        credentials: "include"
    })
        .then(response => {

            if (response.status == 0) {
                window.location.href = "http://localhost:8080"
                return { data: [] }
            }

            return response.json()
        })
        .then(() => window.location.href = "/tasks")

}

export const TaskService = {
    getAllTasks,
    createTask,
    deleteTask
}

export default TaskService