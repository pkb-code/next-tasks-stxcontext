import Layout from "../components/Layout";
import { useState } from "react";
import { useTasks } from "../context/taskContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TasKFormPage = () => {

    const [task, setTask] = useState({
        title: "",
        description: ""
    })

    const {createTask, updateTask, tasks} = useTasks()
    const {push, query} = useRouter()

    const handleChange = (e) => {
        const {name, value} = e.target
        setTask({
            ...task,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!query.id){
            createTask(task.title, task.description)
        }else{
            updateTask(query.id, task)
        }
        
        push("/")       
    }

    const handleDelete = (e) => {
        e.preventDefault()
        push("/")
    }

        


    useEffect( () => {
        if(query.id){
            const taskfound = tasks.find(task => task.id === query.id)
            setTask({title: taskfound.title, description: taskfound.description})
        }
    },[query.id, tasks]) 

    return (
        <Layout className="items-center">
            <form onSubmit={handleSubmit}>
                <h1>{query.id ? "Update a task" : "Add a task"}</h1>
                <input
                    type="text"
                    name="title" 
                    className="w-full px-4 py-3 mb-5 bg-gray-800 focus:text-gray-100 focus:outline-none"
                    placeholder='write a title'
                    onChange={handleChange}
                    value={task.title}
                />
                <textarea 
                    className="w-full px-4 py-3 mb-5 bg-gray-800 focus:text-gray-100 focus:outline-none"
                    name="description"
                    rows="2"
                    placeholder='write a description'
                    onChange={handleChange}
                    value={task.description}
                />
                <button 
                    className="px-4 py-2 font-bold transition-colors bg-green-500 rounded-md hover:bg-green-400 disabled:opacity-25"
                    disabled={!task.title || !task.description}
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </form>
        </Layout>
    );
}

export default TasKFormPage;