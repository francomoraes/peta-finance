import { FaTimes } from 'react-icons/fa';

interface TypeListProps {
    types: string[];
    onRemove?: (type: string) => void;
}

const TypeList = ({ types, onRemove }: TypeListProps) => (
    <div className="flex flex-wrap gap-2">
        {types.map((type) => (
            <div key={type} className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full shadow-sm">
                <span>{type}</span>
                <button onClick={() => onRemove && onRemove(type)} className="ml-2 text-red-600 hover:text-red-800">
                    <FaTimes />
                </button>
            </div>
        ))}
    </div>
);

export default TypeList;
