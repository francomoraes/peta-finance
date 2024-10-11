import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

type DropdownProps = {
    label: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    width?: string;
};

const ClassDropdown = ({ label, options, selected, onSelect, width = 'w-48' }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        setIsOpen(false);
        onSelect(value);
    };

    return (
        <div className={`relative inline-block text-left  ${width}`}>
            <button
                type="button"
                className="inline-flex justify-between max-w-[180px] w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">{selected || label}</span>
                {isOpen ? (
                    <FaChevronUp className="w-5 h-5 ml-2 text-gray-500 rotate-180 transition-all" />
                ) : (
                    <FaChevronUp className="w-5 h-5 ml-2 text-gray-500" />
                )}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full max-h-60 overflow-auto bottom-[42px]">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                option === selected ? 'bg-gray-200' : ''
                            }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClassDropdown;
