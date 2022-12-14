import { createContext, useContext, useState } from 'react'
import { AppConfig, showConnect, UserSession } from '@stacks/connect'

export const WalletContext = createContext()

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

export const useWalletContext = () => {
  return useContext(WalletContext)
}

export const WalletContextProvider = ({ children }) => {
  const [session, setSession] = useState(userSession)
  const [stxAddress, setStxAddress] = useState('')

  const authenticate = () => {
    showConnect({
      appDetails: {
        name: 'nextjs-crud-context',
        icon: window.location.origin + '/my-app-logo.svg'
      },
      userSession: userSession,
      onFinish: () => {
        setSession(userSession)
        setStxAddress(userSession.loadUserData().profile.stxAddress.mainnet)
      }
    })
  }

  const disconnect = () => {
    userSession.signUserOut('/')
    setSession(userSession)
    setStxAddress('')
  }

  return (
    <WalletContext.Provider
      value={{
        session,
        stxAddress,
        authenticate,
        disconnect
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
