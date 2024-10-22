// App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/UserContext';

function App() {
    return (
        <Router>
            <UserProvider>
                <Layout>
                    <AppRoutes />
                </Layout>
            </UserProvider>
        </Router>
    );
}

export default App;
