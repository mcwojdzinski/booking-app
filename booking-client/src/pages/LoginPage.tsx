import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="grow flex items-center justify-around">
            <div className="w-[400px] -mt-10 ">
                <h1 className="text-4xl text-center font-bold mb-4">Login</h1>
                <form className="max-w-xl mx-auto  flex flex-col gap-y-3">
                    <input type="email" placeholder="your@email.com"/>
                    <input type="password" placeholder="*********"/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-600">
                        Don't have a account yet? <Link to="/register"
                                                        className="text-black hover:text-primary transition">Register
                        here</Link>
                    </div>
                </form>
            </div>

        </div>)
}

export default LoginPage
