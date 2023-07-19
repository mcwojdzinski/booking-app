import { createContext, ReactElement, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export const UserContextProvider = ({
    children,
}: {
    children: ReactElement
}): ReactElement => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState<boolean>(false)
    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data)
                    setReady(true)
                })
                .catch((err) => {
                    throw err
                })
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}
