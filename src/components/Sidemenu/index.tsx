import { Link } from 'react-router-dom';
import { menuItems } from '@/routes/routes.json';
import { motion } from 'framer-motion';
import { useUserContext } from '@/context/UserContext';

const SideMenu = () => {
    const { authenticated, logout } = useUserContext();

    if (!menuItems) return null;

    return (
        <motion.aside className="w-[200px] bg-gray-200 p-4" initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }}>
            <nav>
                <ul>
                    {authenticated
                        ? menuItems.authenticated.map((item, index) => (
                              <li key={index}>
                                  <Link to={item.path}>{item.label}</Link>
                              </li>
                          ))
                        : menuItems.unauthenticated.map((item, index) => (
                              <li key={index}>
                                  <Link to={item.path}>{item.label}</Link>
                              </li>
                          ))}
                    {authenticated && (
                        <li key="logout">
                            <button onClick={logout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </motion.aside>
    );
};

export default SideMenu;
