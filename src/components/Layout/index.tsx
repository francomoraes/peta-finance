// components/Layout.tsx
import { ReactNode, useState } from 'react';
import Header from '../Header';
import SideMenu from '../Sidemenu';
import Footer from '../Footer';
import { AnimatePresence } from 'framer-motion';
import { BiMenu } from 'react-icons/bi';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 relative">
                <button
                    className="absolute -top-12 left-2 z-50 bg-white text-black p-3"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <BiMenu />
                </button>
                <AnimatePresence>{showMenu && <SideMenu />}</AnimatePresence>
                <main className="transition-all flex-1 p-3">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
