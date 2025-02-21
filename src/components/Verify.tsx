// src/components/Verify.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackBar from './SnackBar';
import { RegistrationResponse } from '../App';

interface VerifyProps {
    registrationData: RegistrationResponse | null;
}

const Verify: React.FC<VerifyProps> = ({ registrationData }) => {
    const [token, setToken] = useState<string>('');
    const [snackBar, setSnackBar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const navigate = useNavigate();

    const handleVerify = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Pass the user ID from the registration data
                body: JSON.stringify({ userId: registrationData?.user.id, token }),
            });
            const data = await response.json();
            if (data.valid) {
                setSnackBar({ message: 'Success! Code is valid.', type: 'success' });
            } else {
                setSnackBar({ message: 'Invalid code. Try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Verification error:', error);
            setSnackBar({ message: 'An error occurred during verification.', type: 'error' });
        }
    };

    if (!registrationData) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Verify</h2>
                <div className="bg-gray-700 shadow rounded-lg p-6 max-w-md text-white">
                    <p>No registration data found. Please register first.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go to Register
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            {snackBar && (
                <SnackBar
                    message={snackBar.message}
                    type={snackBar.type}
                    onClose={() => setSnackBar(null)}
                />
            )}

            <h2 className="text-2xl font-bold mb-4">Verify Code</h2>
            {/* Display user details and QR code */}
            <div className="bg-gray-700 shadow rounded-lg p-6 max-w-md text-white">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">User Details</h3>
                    <p>
                        <span className="font-medium">User ID:</span> {registrationData.user.id}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {registrationData.user.email}
                    </p>
                    <p>
                        <span className="font-medium">Registered At:</span>{' '}
                        {new Date(registrationData.user.createdAt).toLocaleString()}
                    </p>
                </div>
                {/* Optionally show the QR code again */}
                <div className="mb-4">
                    <p className="font-medium">QR Code:</p>
                    <img src={registrationData.qrCodeDataURL} alt="QR Code" className="mx-auto" />
                </div>

                {/* Verification Input */}
                <div className="mb-4">
                    <label htmlFor="token" className="block mb-2">
                        Enter 6-digit Code
                    </label>
                    <input
                        id="token"
                        type="text"
                        placeholder="e.g., 123456"
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleVerify}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default Verify;
