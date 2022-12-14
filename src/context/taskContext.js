import { createContext, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

export const TaskContext = createContext()

export const useTasks = () => {
  return useContext(TaskContext)
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const createTask = (title, description) => {
    setTasks([...tasks, { title, description, id: uuid() }])
  }

  const updateTask = (id, updatedTask) =>
    setTasks([
      ...tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    ])

  const deleteTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)])
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
