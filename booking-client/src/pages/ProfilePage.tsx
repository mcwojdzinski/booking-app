import {useContext, useState} from 'react'
import {UserContext} from '../UserContext.tsx'
import {Link, Navigate, useParams} from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage.tsx'
import AccountNav from "../AccountNav.tsx";

const AccountPage = () => {
    const [redirect, setRedirect] = useState<string | null>(null)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {user, ready, setUser}: { user: any; ready: boolean } =
        useContext(UserContext)

    let {subpage} = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    const logout = async () => {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto flex flex-col justify-center">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className="primary w-full  mt-2">
                        Logout
                    </button>
                </div>
            )}

            {subpage === 'places' && <PlacesPage/>}
        </div>
    )
}

export default AccountPage
