import { FaPencilAlt } from 'react-icons/fa';

export const EditableCell = ({
    isEditing,
    value,
    field,
    onEdit,
    onSave,
    rowIndex,
    currency
}: {
    isEditing: boolean;
    value: number | string;
    field: string;
    onEdit: () => void;
    onSave: (index: number, field: string, value: string) => void;
    rowIndex: number;
    currency?: string;
}) => {
    return isEditing ? (
        <input
            type="number"
            value={value}
            onChange={(e) => onSave(rowIndex, field, e.target.value)}
            onBlur={onEdit}
            className="border px-2 py-1 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
            autoFocus
            step="any"
        />
    ) : (
        <div onClick={onEdit} className="flex items-center justify-center gap-1 cursor-pointer hover:text-blue-500">
            {currency
                ? value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency
                  })
                : value}
            <FaPencilAlt width={10} height={10} />
        </div>
    );
};
