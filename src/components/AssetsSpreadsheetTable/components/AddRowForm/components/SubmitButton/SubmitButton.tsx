const SubmitButton = ({ addRow }: { addRow: () => void }) => {
    return (
        <div className="w-full md:w-auto flex-1">
            <button
                className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-green-600 transition duration-200"
                onClick={(e) => {
                    e.preventDefault();
                    addRow();
                }}
            >
                Add Row
            </button>
        </div>
    );
};

export default SubmitButton;
