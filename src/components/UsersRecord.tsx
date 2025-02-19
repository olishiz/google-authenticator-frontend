import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    email: string;
    totpSecret?: string;
    createdAt: string;
}

const UsersRecord: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                console.error(err);
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <p className="text-gray-700">Loading users...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">Users Record</h2>
            <div className="bg-white shadow rounded-lg p-6">
                {users.length === 0 ? (
                    <p className="text-gray-700">No users found.</p>
                ) : (
                    <table className="min-w-full border-collapse">
                        <thead>
                        <tr className="bg-slate-100">
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">TOTP Secret</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b last:border-b-0">
                                <td className="py-2 px-4 text-sm text-gray-800">{user.id}</td>
                                <td className="py-2 px-4 text-sm text-gray-800">{user.email}</td>
                                <td className="py-2 px-4 text-sm text-gray-800">{user.totpSecret || '-'}</td>
                                <td className="py-2 px-4 text-sm text-gray-800">
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UsersRecord;
