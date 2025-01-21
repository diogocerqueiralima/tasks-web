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
        .then((response: { data: TaskDto[] }) => response.data.map(dto => new Task(dto.id, dto.title, dto.description, new Date(dto.created_at), new Date(dto.deadline), dto.steps, dto.status)))

}

export const TaskService = {
    getAllTasks
}

export default TaskService