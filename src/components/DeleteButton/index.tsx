import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

interface DeleteButtonProps {
    onClick: () => void;
    className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, className = '' }) => {
    return (
        <button
            className={`group absolute right-[8px] top-[50%] -translate-y-[50%] w-[32px] h-[32px] flex justify-center items-center rounded-full bg-gray-100 hover:bg-red-200 transition-colors ${className}`}
            onClick={onClick}
        >
            {/* Use `fill` instead of `stroke` to change SVG color */}
            <FaRegTrashAlt className="fill-gray-600 group-hover:fill-red-800 transition-colors" />
        </button>
    );
};

export default DeleteButton;
