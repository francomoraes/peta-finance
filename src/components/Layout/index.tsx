// components/Layout.tsx
import { ReactNode } from 'react';
import Header from '../Header';
import SideMenu from '../Sidemenu';
import Footer from '../Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
