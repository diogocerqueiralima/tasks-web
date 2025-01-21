import { Status, Tag } from "../domain/Task"

export default interface TaskDto {

    id: number
    title: string
    description: string
    created_at: string
    deadline: string
    steps: number[]
    status: Status
    tags: Tag[]

}