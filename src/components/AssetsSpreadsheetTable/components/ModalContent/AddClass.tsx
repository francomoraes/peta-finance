import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { deleteTypes } from './service/api';
import FormDropdown from './components/FormDropdown/FormDropdown';
import TypeList from './components/TypeList/TypeList';

interface AddClassFormProps {
    onSubmit: (data: { asset_class: string; asset_type: string[] }[]) => void;
    onCancel: () => void;
    closeModal: () => void;
    existingClasses?: string[];
    possibleAssetTypes?: { [key: string]: string[] };
}

const AddClassForm = ({
    onSubmit,
    onCancel,
    closeModal,
    existingClasses = [],
    possibleAssetTypes = {}
}: AddClassFormProps) => {
    const [newClassName, setNewClassName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [newType, setNewType] = useState('');
    const [types, setTypes] = useState<string[]>([]);
    const [existingTypes, setExistingTypes] = useState<string[]>([]);
    const [deletedTypes, setDeletedTypes] = useState<string[]>([]);

    useEffect(() => {
        if (selectedClass && possibleAssetTypes[selectedClass]) {
            setExistingTypes(possibleAssetTypes[selectedClass]);
            setDeletedTypes([]);
        } else {
            setExistingTypes([]);
        }
    }, [selectedClass, possibleAssetTypes]);

    const handleAddType = () => {
        if (newType && !types.includes(newType)) {
            setTypes([...types, newType]);
            setNewType('');
        }
    };

    const handleRemoveType = (typeToRemove: string) => {
        setTypes(types.filter((type) => type !== typeToRemove));
    };

    const handleRemoveExistingType = (typeToRemove: string) => {
        setDeletedTypes([...deletedTypes, typeToRemove]);
        setExistingTypes(existingTypes.filter((type) => type !== typeToRemove));
    };

    const handleSubmit = async () => {
        const classTypeArray = [];

        if (newClassName && types.length > 0) {
            classTypeArray.push({ asset_class: newClassName, asset_type: types });
        } else if (selectedClass && types.length > 0) {
            classTypeArray.push({ asset_class: selectedClass, asset_type: types });
        }

        if (classTypeArray.length > 0) {
            await onSubmit(classTypeArray);
        }

        if (deletedTypes.length > 0) {
            await deleteTypes(selectedClass, deletedTypes).then(() => {
                closeModal();
            });
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Class or Type</h2>
            <div className="flex flex-col gap-4">
                <FormDropdown
                    label="Select Existing Class"
                    value={selectedClass}
                    options={existingClasses}
                    onChange={(value) => {
                        setSelectedClass(value);
                        setNewClassName('');
                        setTypes([]);
                    }}
                />

                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700">Or Create New Class</label>
                    <input
                        type="text"
                        value={newClassName}
                        onChange={(e) => {
                            setNewClassName(e.target.value);
                            setSelectedClass('');
                            setTypes([]);
                        }}
                        placeholder="New Class Name"
                        className="mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700">Add New Type</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            placeholder="New Type"
                            className="flex-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        />
                        <button
                            onClick={handleAddType}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-200"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                {existingTypes.length > 0 && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Existing Types</label>
                        <TypeList types={existingTypes} onRemove={handleRemoveExistingType} />
                    </>
                )}

                {types.length > 0 && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Types</label>
                        <TypeList types={types} onRemove={handleRemoveType} />
                    </>
                )}

                {deletedTypes.length > 0 && (
                    <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Types to delete</label>
                        <TypeList types={deletedTypes} />
                    </>
                )}

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-gray-600 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-green-600 transition duration-200"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddClassForm;
