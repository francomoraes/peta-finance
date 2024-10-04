interface ActionButtonProps {
    type: 'save' | 'cancel';
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick }) => {
    const isSave = type === 'save';
    const buttonStyles = isSave
        ? 'bg-green-500 hover:bg-green-600 text-white'
        : 'bg-red-500 hover:bg-red-600 text-white';

    return (
        <button onClick={onClick} className={`${buttonStyles} px-4 py-2 rounded shadow-md`}>
            {isSave ? 'Save' : 'Cancel'}
        </button>
    );
};

export default ActionButton;
