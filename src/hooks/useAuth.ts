import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
    name?: string;
    email: string;
    password: string;
    token?: string;
}

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined') {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
            fetchUserData(JSON.parse(token));
        }
    }, []);

    const authUser = async (data: any) => {
        setAuthenticated(true);
        console.log('data em authUser', data);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/');
    };

    const register = async (user?: User) => {
        let messageText = 'User registered successfully';
        let messageType = 'success';

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data;
            });

            await authUser(data);
        } catch (error) {
            messageText = 'Error registering user';
            messageType = 'error';
        }
    };

    const login = async (user?: User) => {
        let messageText = 'User logged in successfully';
        let messageType = 'success';

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data;
            });

            await authUser(data);
        } catch (error) {
            messageText = 'Error logging in';
            messageType = 'error';
        }
    };

    const logout = () => {
        let messageText = 'User logged out successfully';
        let messageType = 'success';

        setAuthenticated(false);
        localStorage.removeItem('token');

        api.defaults.headers.Authorization = null;

        navigate('/login');
    };

    const fetchUserData = async (token: string) => {
        try {
            const response = await api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser({ ...response.data.user, token });
        } catch (error) {
            console.error('Error fetching user data', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        authenticated,
        setAuthenticated,
        register,
        login,
        logout,
        user,
        loading
    };
};
