// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import Verify from './components/Verify';
import UsersRecord from './components/UsersRecord';

export interface RegistrationResponse {
    user: {
        id: number;
        email: string;
        totpSecret?: string;
        createdAt: string;
    };
    qrCodeDataURL: string;
}

const App: React.FC = () => {
    const [registrationData, setRegistrationData] = useState<RegistrationResponse | null>(null);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Register setRegistrationData={setRegistrationData} />} />
                <Route path="/verify" element={<Verify registrationData={registrationData} />} />
                <Route path="/users" element={<UsersRecord />} />
            </Routes>
        </Layout>
    );
};

export default App;
