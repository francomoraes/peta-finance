interface ToggleButtonProps {
    isToggled: boolean;
    onClick: () => void;
    className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isToggled, onClick, className = '' }) => {
    return (
        <button
            className={`${
                isToggled ? 'bg-yellow-100 text-black' : 'bg-blue-400 text-white'
            } text-xl px-4 pb-2 rounded shadow-md hover:bg-gray-200 w-full leading-none ${className}`}
            onClick={onClick}
        >
            {isToggled ? '-' : '+'}
        </button>
    );
};

export default ToggleButton;
