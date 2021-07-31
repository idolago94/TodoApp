import { TaskProps } from "../components/Task"
import { createContext } from "react"

type TasksContextType = {
    tasks: TaskProps[],
    updateTasks: Function
}

export const TasksContext = createContext<TasksContextType>({ tasks: [], updateTasks: (newTasks: TaskProps[]) => { } })