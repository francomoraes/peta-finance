import { mockData } from '../../fakeAssetSpreadsheetData';
import { calculateProfit } from '../../utils/calculateProfit';
import { EditableCell } from '../EditableCell';
import { ProfitIndicator } from '../ProfitIndicator';
import { StyledCell } from '../StyledCell';

export const TableRow = ({
    item,
    rowIndex,
    setIsEditing, // Add setIsEditing prop to handle state in the parent component
    editingField,
    handleEditChange,
    setEditingField,
    totalWealth
}: {
    item: (typeof mockData)[0];
    rowIndex: number;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // Add this prop to control isEditing state
    editingField: { row: number; field: string } | null;
    handleEditChange: (index: number, field: string, value: string) => void;
    setEditingField: React.Dispatch<React.SetStateAction<{ row: number; field: string } | null>>;
    totalWealth: number;
}) => {
    const profit = calculateProfit(item);

    const handleEdit = (field: string) => {
        setEditingField({ row: rowIndex, field });
        setIsEditing(true); // Set isEditing to true when editing starts
    };

    return (
        <div className="grid grid-cols-12 gap-4 items-center bg-white rounded-md shadow-md p-4 mb-2">
            <StyledCell>{item.asset_class}</StyledCell>
            <StyledCell>{item.asset_type}</StyledCell>
            <StyledCell>{item.asset_ticker}</StyledCell>

            {/* Editable Quantity Field */}
            <StyledCell>
                <EditableCell
                    isEditing={editingField?.row === rowIndex && editingField?.field === 'asset_qty'}
                    value={item.asset_qty}
                    field="asset_qty"
                    onEdit={() => handleEdit('asset_qty')}
                    onSave={handleEditChange}
                    rowIndex={rowIndex}
                />
            </StyledCell>

            {/* Editable Average Price Field */}
            <StyledCell>
                <EditableCell
                    isEditing={editingField?.row === rowIndex && editingField?.field === 'avg_price'}
                    value={item.avg_price}
                    field="avg_price"
                    onEdit={() => handleEdit('avg_price')}
                    onSave={handleEditChange}
                    rowIndex={rowIndex}
                />
            </StyledCell>

            <StyledCell>{item.current_price}</StyledCell>
            <StyledCell>{item.currency}</StyledCell>
            <StyledCell>{(item.asset_qty * item.avg_price).toFixed(2)}</StyledCell>
            <StyledCell>{(item.asset_qty * item.current_price).toFixed(2)}</StyledCell>
            <StyledCell>
                {(item.asset_qty * item.current_price - item.asset_qty * item.avg_price).toFixed(2)}
            </StyledCell>
            <ProfitIndicator profit={profit} />
            <StyledCell>{(((item.asset_qty * item.current_price) / totalWealth) * 100).toFixed(2)}</StyledCell>
        </div>
    );
};
