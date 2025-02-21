// src/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationResponse } from '../App';

interface RegisterProps {
    setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationResponse | null>>;
}

const Register: React.FC<RegisterProps> = ({ setRegistrationData }) => {
    const [email, setEmail] = useState<string>('');
    const [registrationData, setLocalRegistrationData] = useState<RegistrationResponse | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const data: RegistrationResponse = await response.json();
            setLocalRegistrationData(data);
            setRegistrationData(data); // update parent state with full registration info
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Register</h2>

            {/* Registration Form */}
            <div className="bg-gray-700 shadow rounded-lg p-6 max-w-md text-white">
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-gray-200">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Register
                </button>
            </div>

            {/* Registration Result */}
            {registrationData && (
                <div className="bg-gray-700 shadow rounded-lg p-6 max-w-md text-white">
                    <h3 className="text-xl font-semibold mb-4">Registration Details</h3>
                    <div className="mb-4 space-y-1">
                        <p>
                            <span className="font-medium">User ID:</span> {registrationData.user.id}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span> {registrationData.user.email}
                        </p>
                        {registrationData.user.totpSecret && (
                            <p>
                                <span className="font-medium">TOTP Secret:</span> {registrationData.user.totpSecret}
                            </p>
                        )}
                        <p>
                            <span className="font-medium">Created At:</span>{' '}
                            {new Date(registrationData.user.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="font-medium mb-2">Scan this QR Code with your Authenticator App:</p>
                        <img src={registrationData.qrCodeDataURL} alt="QR Code" className="mx-auto" />
                    </div>
                    <button
                        onClick={() => navigate('/verify')}
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Proceed to Verification
                    </button>
                </div>
            )}
        </div>
    );
};

export default Register;
