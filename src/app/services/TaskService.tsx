import Task from "../domain/Task"

function getAllTasks(): Promise<Task[]> {

    return fetch('http://localhost:8080/tasks', {
        redirect: "manual",
        credentials: "include"
    })
        .then(response => {

            if (response.status == 0) {

                if (location) {
                    window.location.href = "http://localhost:8080"
                    return { data: [] }
                }

            }

            return response.json()
        })
        .then(response => response.data)

}

export const TaskService = {
    getAllTasks
}

export default TaskService