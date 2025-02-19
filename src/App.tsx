import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import Verify from './components/Verify';
import UsersRecord from './components/UsersRecord';

const App: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);

    return (
        <Layout>
            {/* Define all routes within the Layout */}
            <Routes>
                <Route path="/" element={<Register setUserId={setUserId} />} />
                <Route path="/verify" element={<Verify userId={userId} />} />
                <Route path="/users" element={<UsersRecord />} />
            </Routes>
        </Layout>
    );
};

export default App;
