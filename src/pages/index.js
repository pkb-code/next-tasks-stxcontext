import Head from 'next/head'
import { useTasks } from '../context/taskContext'
import Layout from '../components/Layout'
import {VscTrash} from 'react-icons/vsc'
import Router, {useRouter} from 'next/router'
import { useWalletContext } from '../context/WalletContext'

export default function Home() {
  
  const { tasks, deleteTask } = useTasks()
  const {push} = useRouter()
  const {session, authenticate, disconnect} = useWalletContext()
  
  return (
    <Layout>
      <div className="flex justify-center">
        {
          session.isUserSignedIn() ?
          (
            tasks.length === 0 ? 
            (
              <h2>There are no tasks.</h2>
            ) : 
            (
              <div className="">
                {(tasks).map((task, i) => (
                  <div 
                    className="flex items-center justify-start px-20 py-5 m-2 transition-colors bg-gray-700 rounded shadow-sm cursor-pointer shadow-gray-500 hover:bg-gray-600" 
                    key={task.id}
                    onClick={() => push(`/edit/${task.id}`)}
                  >
                    <span className="mr-5 text-5xl">{i+1}</span>
                    <div className="w-full ">
                      <div className="flex justify-between">
                        <h1 className="font-extrabold">{task.title}</h1>
                        <button className="items-center px-3 py-1 transition-colors bg-red-700 rounded-md hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteTask(task.id)
                            Router.push('/')                       
                          }}
                        >
                          <VscTrash className="inline-flex mr-2" />
                          Delete
                        </button>
                      </div>
                      
                      <p>{task.description}</p>
                      <span className="text-sm text-gray-400 font-extralight">{task.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) 
          ) :
          (
            "Connect wallet to manage your taks!!"
          )
        }
                    
      </div>
    </Layout>
  );
}
