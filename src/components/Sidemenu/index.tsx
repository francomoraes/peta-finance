import { Link } from 'react-router-dom';
import { menuItems } from '@/routes/routes.json';

const SideMenu = () => {
    if (!menuItems) return null;

    return (
        <aside className="w-64 bg-gray-200 p-4">
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default SideMenu;
