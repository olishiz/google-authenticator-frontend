import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-50 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#2d3747] border-r border-gray-200 p-6">
                <div className="text-2xl font-bold mb-8">Dashboard</div>
                <nav className="space-y-4">
                    <Link
                        to="/"
                        className="block px-3 py-2 rounded hover:bg-slate-100 transition-colors"
                    >
                        Register
                    </Link>
                    <Link
                        to="/users"
                        className="block px-3 py-2 rounded hover:bg-slate-100 transition-colors"
                    >
                        Users Record
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
};

export default Layout;
