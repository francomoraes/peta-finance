import { useAuth, User } from '@/hooks/useAuth';
import { createContext, useContext } from 'react';

interface UserContextData {
    register: (user?: User) => Promise<void>;
    login: (user?: User) => Promise<void>;
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { register, login, authenticated, setAuthenticated, logout } = useAuth();

    return (
        <UserContext.Provider
            value={{
                register,
                login,
                authenticated,
                setAuthenticated,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
