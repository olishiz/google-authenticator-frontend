import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
    <header className="bg-blue-600 text-white py-4 shadow">
        <nav className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-xl font-bold">Google Authenticator App</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Register</Link>
                <Link to="/verify" className="hover:underline">Verify</Link>
                <Link to="/users" className="hover:underline">Users Record</Link>
            </div>
        </nav>
    </header>
);

export default Header;
