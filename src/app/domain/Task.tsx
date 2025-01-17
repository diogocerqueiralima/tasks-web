interface Task {

    id: number
    title: string
    description: string
    created_at: Date
    deadline: Date
    steps: number[]
    status: Status

}

enum Status {

    PENDING, IN_PROGRESS, COMPLETED

}

export default Task