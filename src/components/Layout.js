import { AiOutlinePlusSquare } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTasks } from '../context/taskContext'
import { useWalletContext } from '../context/WalletContext'

const Layout = ({ children }) => {
  const router = useRouter()
  const { tasks } = useTasks()
  const { session, authenticate, disconnect } = useWalletContext()

  return (
    <div className='items-center h-screen text-white bg-gray-900'>
      <header className='flex items-center py-5 bg-gray-500 px-28'>
        <Link href='/'>
          <h1 className='text-lg font-black'>Task App</h1>
        </Link>
        <span className='ml-2 font-bold text-gray-400'>
          {tasks.length} Tasks
        </span>

        <div className='flex-grow text-right'>
          {session.isUserSignedIn() ? (
            <button
              className='inline-flex items-center px-5 py-2 mr-2 font-bold transition-colors bg-green-500 rounded-md hover:bg-green-400 disabled:opacity-25'
              disabled={!session.isUserSignedIn()}
              onClick={() => {
                router.push('/new')
              }}
            >
              <AiOutlinePlusSquare className='mr-2' />
              Add Task
            </button>
          ) : (
            ''
          )}

          <div className='items-center flex-grow text-right'>
            <button
              className='items-center px-5 py-2 m-2 mr-2 font-bold transition-colors bg-green-500 rounded-md hover:bg-green-400 disabled:opacity-25'
              onClick={() => {
                session.isUserSignedIn() ? disconnect() : authenticate()
              }}
            >
              {session.isUserSignedIn()
                ? 'Disconnect wallet'
                : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </header>

      <main className='py-10 px-28'>{children}</main>
    </div>
  )
}

export default Layout
