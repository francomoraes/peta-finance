import { useState } from 'react';
import AuthInput from './components/AuthInput/AuthInput';
import { useUserContext } from '@/context/UserContext';

const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const { login } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formState);
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold text-gray-900 mb-8">Login</h1>
            <form onSubmit={handleSubmit}>
                <AuthInput label="Email" type="email" name="email" placeholder="E-mail" onChange={handleChange} />
                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={handleChange}
                />
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4">Login</button>
            </form>
            <h3>Google OAuth!</h3>
            <button type="button" onClick={() => {}}>
                Google Sign In
            </button>
        </div>
    );
};

export default Login;
