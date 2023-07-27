import Header from './components/Header.tsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto items-center">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
