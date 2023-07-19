import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import axios from 'axios'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (
        ev: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        ev.preventDefault()
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            })
            alert('Registration successful. Now you can log in')
        } catch (e) {
            alert('Registration failed. Please try again later')
        }

        return undefined
    }

    return (
        <div className="grow flex items-center justify-around">
            <div className="w-[400px] -mt-10 ">
                <h1 className="text-4xl text-center font-bold mb-4">
                    Register here
                </h1>
                <form
                    className="max-w-xl mx-auto  flex flex-col gap-y-3"
                    onSubmit={registerUser}
                >
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input
                        type="password"
                        placeholder="*********"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-600">
                        Already a member?{' '}
                        <Link
                            to="/login"
                            className="text-black hover:text-primary transition"
                        >
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
