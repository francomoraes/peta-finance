import { FaPlus } from 'react-icons/fa';
import ClassDropdown from '../ClassDropdown/Classdropdown';

const FormDropdown = ({
    label,
    formState,
    setFormState,
    setSelectedAssetClass,
    options,
    selected,
    openModal
}: {
    label: string;
    formState: any;
    setFormState: any;
    setSelectedAssetClass?: any;
    options: string[];
    selected: string;
    openModal: () => void;
}) => {
    return (
        <div className="w-full md:w-auto flex gap-2">
            <ClassDropdown
                label={label}
                options={options}
                selected={selected}
                onSelect={(value: string) => {
                    if (value === 'create-new') {
                        openModal();
                        return;
                    }

                    if (setSelectedAssetClass) {
                        setSelectedAssetClass(value);
                        setFormState({ ...formState, asset_class: value, asset_type: '' });
                    } else {
                        setFormState({ ...formState, asset_type: value });
                    }
                }}
            />
            <button
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                    e.preventDefault();
                    openModal();
                }}
            >
                <FaPlus className="inline-block" />
            </button>
        </div>
    );
};

export default FormDropdown;
