import { Link } from 'react-router-dom';
import { menuItems } from '@/routes/routes.json';
import { motion } from 'framer-motion';

const SideMenu = () => {
    if (!menuItems) return null;

    return (
        <motion.aside className="w-[200px] bg-gray-200 p-4" initial={{ x: -200 }} animate={{ x: 0 }} exit={{ x: -200 }}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.aside>
    );
};

export default SideMenu;
