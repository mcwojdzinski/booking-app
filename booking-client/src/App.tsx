import './App.css'
import { Route, Routes } from 'react-router-dom'

// Layout
import Layout from './Layout.tsx'

// Pages
import RegisterPage from './pages/RegisterPage.tsx'
import IndexPage from './pages/IndexPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import axios from 'axios'
import { UserContextProvider } from './UserContext.tsx'
import AccountPage from './pages/AccountPage.tsx'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/account/:subpage?"
                        element={<AccountPage />}
                    />
                    <Route
                        path="/account/:subpage/:action"
                        element={<AccountPage />}
                    />
                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
