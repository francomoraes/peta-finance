import { FaPencilAlt } from 'react-icons/fa';

export const EditableCell = ({
    isEditing,
    value,
    field,
    onEdit,
    onSave,
    rowIndex
}: {
    isEditing: boolean;
    value: number | string;
    field: string;
    onEdit: () => void;
    onSave: (index: number, field: string, value: string) => void;
    rowIndex: number;
}) => {
    return isEditing ? (
        <input
            // type="number"
            value={value}
            onChange={(e) => onSave(rowIndex, field, e.target.value)}
            onBlur={onEdit}
            className="border px-2 py-1 w-full rounded-md shadow-sm focus:outline-none focus:border-blue-400"
            autoFocus
        />
    ) : (
        <div onClick={onEdit} className="flex items-center justify-center gap-1 cursor-pointer hover:text-blue-500">
            {value}
            <FaPencilAlt width={10} height={10} />
        </div>
    );
};
