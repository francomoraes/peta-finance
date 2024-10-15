import React from 'react';

interface FormDropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

const FormDropdown = ({ label, value, options, onChange }: FormDropdownProps) => {
    return (
        <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            >
                <option value="">-- Select Class --</option>
                {options.map((className) => (
                    <option key={className} value={className}>
                        {className}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormDropdown;
