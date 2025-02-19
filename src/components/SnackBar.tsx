import React, { useEffect } from 'react';

interface SnackBarProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const SnackBar: React.FC<SnackBarProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Closes after 3 seconds
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-lg text-white 
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
      `}
        >
            {message}
        </div>
    );
};

export default SnackBar;
