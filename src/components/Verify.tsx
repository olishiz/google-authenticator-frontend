import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackBar from './SnackBar';

interface VerifyProps {
    userId: number | null;
}

const Verify: React.FC<VerifyProps> = ({ userId }) => {
    const [token, setToken] = useState<string>('');
    const [snackBar, setSnackBar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const navigate = useNavigate();

    const handleVerify = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, token }),
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

    if (!userId) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Verify</h2>
                <div className="bg-white shadow rounded-lg p-6 max-w-md">
                    <p className="text-gray-800">No user ID found. Please register first.</p>
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

            <h2 className="text-2xl font-bold text-gray-700">Verify Code</h2>
            <div className="bg-white shadow rounded-lg p-6 max-w-md">
                <div className="mb-4">
                    <label htmlFor="token" className="block text-gray-700 mb-2">
                        Enter 6-digit Code
                    </label>
                    <input
                        id="token"
                        type="text"
                        placeholder="e.g., 123456"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
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
