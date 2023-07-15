import {createContext, ReactElement, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({})

export const UserContextProvider = ({children}: { children: ReactElement }): ReactElement => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            }).catch(err => {
                throw err;
            })
        }
    }, [])
    return (<UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>)
}