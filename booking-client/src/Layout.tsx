import Header from './components/Header.tsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
