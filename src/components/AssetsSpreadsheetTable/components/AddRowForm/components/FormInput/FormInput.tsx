const FormInput = ({
    label,
    value,
    formState,
    setFormState,
    fieldKey
}: {
    label: string;
    value: string;
    formState: any;
    setFormState: any;
    fieldKey: string;
}) => {
    return (
        <div className="w-full md:w-auto flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={value || ''} // Ensure the value is always a string
                onChange={(e) => setFormState({ ...formState, [fieldKey]: e.target.value })}
                placeholder={label}
                className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
        </div>
    );
};

export default FormInput;
