export default class Task {

    id: number
    title: string
    description: string
    created_at: Date
    deadline: Date
    steps: number[]
    status: Status

    constructor(id: number, title: string, description: string, created_at: Date, deadline: Date, steps: number[], status: Status) {
        this.id = id
        this.title = title
        this.description = description
        this.created_at = created_at
        this.deadline = deadline
        this.steps = steps
        this.status = status
      }

      getEmojiStatus(): string {

        switch (this.status) {
            case Status.PENDING:
                return "🟡"
            case Status.IN_PROGRESS:
                return "🔵"
            case Status.COMPLETED:
                return "🟢"
            default:
                return "❓"
        }

      }

}

export enum Status {

    PENDING = "PENDING", 
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"

}