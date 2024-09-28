import { Routes, Route } from 'react-router-dom';
import { menuItems } from './routes.json';
import Home from '@/Pages/Home';
import AssetAlocation from '@/Pages/AssetAlocation';
import AssetDetail from '@/Pages/AssetDetail';
import WealthEvolution from '@/Pages/WealthEvolution';
import About from '@/Pages/About';
import AssetsSpreadsheet from '@/Pages/AssetsSpreadsheet';

const AppRoutes = () => {
    return (
        <Routes>
            {menuItems.map((item, index) => {
                switch (item.path) {
                    case '/':
                        return <Route key={item.path} path={item.path} element={<Home />} />;
                    case '/asset-alocation':
                        return <Route key={item.path} path={item.path} element={<AssetAlocation />} />;
                    case '/asset-detail':
                        return <Route key={item.path} path={item.path} element={<AssetDetail />} />;
                    case '/assets-spreadsheet':
                        return <Route key={item.path} path={item.path} element={<AssetsSpreadsheet />} />;
                    case '/wealth-evolution':
                        return <Route key={item.path} path={item.path} element={<WealthEvolution />} />;
                    case '/about':
                        return <Route key={item.path} path={item.path} element={<About />} />;
                    default:
                        return null;
                }
            })}
        </Routes>
    );
};

export default AppRoutes;
