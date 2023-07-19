import { Link, Navigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext.tsx'

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [redirect, setRedirect] = useState<boolean>(false)

    const { setUser } = useContext(UserContext)
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data)
            alert('Login successful')
            setRedirect(true)
        } catch (e) {
            alert('Login failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="grow flex items-center justify-around">
            <div className="w-[400px] -mt-10 ">
                <h1 className="text-4xl text-center font-bold mb-4">Login</h1>
                <form
                    className="max-w-xl mx-auto  flex flex-col gap-y-3"
                    onSubmit={handleLogin}
                >
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <input
                        type="password"
                        placeholder="*********"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-600">
                        Don't have a account yet?{' '}
                        <Link
                            to="/register"
                            className="text-black hover:text-primary transition"
                        >
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
