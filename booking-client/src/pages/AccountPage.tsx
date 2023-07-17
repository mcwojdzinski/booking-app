import {useContext, useState} from "react";
import {UserContext} from "../UserContext.tsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const [redirect, setRedirect] = useState<string | null>(null)
    const {user, ready, setUser}: { user: any, ready: boolean } = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }
    const activeLink = (type: string | null = null): string => {
        let classes = 'py-2 px-6';
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' bg-primary text-white rounded-full '
        }
        return classes
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/')
        setUser(null)
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return <div>
        <nav className="w-full flex gap-4 justify-center mt-4 mb-8">
            <Link className={activeLink('profile')} to={'/account'}>My profile</Link>
            <Link className={activeLink('bookings')} to={'/account/bookings'}>My bookings</Link>
            <Link className={activeLink('places')} to={'/account/places'}>My places</Link>
        </nav>

        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto flex flex-col justify-center">
                Logged in as {user.name} ({user.email})
                <button onClick={logout} className="primary w-full  mt-2">Logout</button>
            </div>)}


    </div>
}

export default AccountPage