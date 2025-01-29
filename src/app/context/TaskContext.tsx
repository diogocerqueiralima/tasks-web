'use client'

import { createContext, useContext, useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import Task from "../domain/Task";
import Toast from "../components/toast/Toast";

type TaskContextType = {
    tasks: Task[]
    createTask: (title: string, description: string, deadline: string, tags: string[]) => Promise<void>
    deleteTask: (id: number) => Promise<void>
    updateTask: (id: number, title: string, description: string, deadline: string, tags: string[]) => Promise<void>,
    isLoading: boolean
};

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    createTask: () => {
      throw new Error("createTask: There is no implementation.")
    },
    deleteTask: () => {
        throw new Error("deleteTask: There is no implementation.")
    },
    updateTask: () => {
        throw new Error("updateTask: There is no implementation")
    },
    isLoading: true
  })

export const TaskProvider = ({children}: {children: React.ReactNode}) => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorForm, setErrorForm] = useState(false)

    useEffect(() => {

        TaskService.getAllTasks()
            .then(t => {setTasks(t); setIsLoading(false)})
            .catch(() => {
                setErrorMessage("An unexpected error has occurred.")
                setErrorForm(true)
                setIsLoading(false)
            })

    }, [])

    async function createTask(title: string, description: string, deadline: string, tags: string[]) {

        if (!title.trim() || !description.trim()) {
            setErrorMessage("The title or description cannot be blank.")
            setErrorForm(true)
            throw new Error(errorMessage)
        }

        const today = new Date();
        const selectedDate = new Date(deadline);

        if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
            setErrorMessage("Please select a valid date that is later than today.")
            setErrorForm(true)
            throw new Error(errorMessage)
        }

        if (tags.length == 0) {
            setErrorMessage("Please provide at least one tag.")
            setErrorForm(true)
            throw new Error(errorMessage)
        }

        setIsLoading(true)

        return TaskService.createTask(title, description, deadline, tags)
            .then(obj => {

                if (obj.data != null)
                    setTasks([...tasks, new Task(obj.data.id, obj.data.title, obj.data.description, new Date(obj.data.created_at), new Date(obj.data.deadline), obj.data.steps, obj.data.status, obj.data.tags)])

            })
            .catch(() => {
                setErrorMessage("An unexpected error has occurred.")
                setErrorForm(true)
            })
            .then(() => setIsLoading(false))

    }

    async function deleteTask(id: number) {

        setIsLoading(true)

        return TaskService.deleteTask(id)
            .then(() => setTasks(tasks.filter(task => task.id != id)))
            .catch(() => {
                setErrorMessage("An unexpected error has occurred.")
                setErrorForm(true)
            })
            .then(() => setIsLoading(false))

    }

    async function updateTask(id: number, title: string, description: string, deadline: string, tags: string[]) {

        if (!title.trim() || !description.trim()) {
            setErrorMessage("The title or description cannot be blank.")
            setErrorForm(true)
            throw new Error(errorMessage)
        }

        const today = new Date();
        const selectedDate = new Date(deadline);

        if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
            setErrorMessage("Please select a valid date that is later than today.")
            setErrorForm(true)
            throw new Error(errorMessage)
        }

        if (tags.length == 0) {
            setErrorMessage("Please provide at least one tag.")
            setErrorForm(true)
            throw new Error(errorMessage)
        }

        setIsLoading(true)

        return TaskService.updateTask(id, title, description, deadline, tags)
            .then(obj => {
                
                if (obj.data != null)
                    setTasks([
                        ...(tasks.filter(task => task.id != id)), 
                        new Task(obj.data.id, obj.data.title, obj.data.description, new Date(obj.data.created_at), new Date(obj.data.deadline), obj.data.steps, obj.data.status, obj.data.tags)
                    ])

            })
            .catch(() => {
                setErrorMessage("An unexpected error has occurred.")
                setErrorForm(true)
            })
            .then(() => setIsLoading(false))


    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask, isLoading }}>
            { errorForm && <Toast icon='bx bxs-error' message={errorMessage} time={5000} removeToast={() => { setErrorForm(false) }} /> }
            {children}
        </TaskContext.Provider>
      )

}

export const useTasks = () => {
    return useContext(TaskContext);
};