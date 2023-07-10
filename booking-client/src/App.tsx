import './App.css'
import {Route, Routes} from 'react-router-dom'

// Layout
import Layout from './Layout.tsx'

// Pages
import RegisterPage from "./pages/RegisterPage.tsx";
import IndexPage from './pages/IndexPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<IndexPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
