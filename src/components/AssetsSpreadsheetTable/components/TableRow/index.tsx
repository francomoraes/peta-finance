import { Asset } from '../../types';
import { calculateProfit } from '../../utils/calculateProfit';
import { EditableCell } from '../EditableCell';
import { ProfitIndicator } from '../ProfitIndicator';
import { StyledCell } from '../StyledCell';

export const TableRow = ({
    item,
    rowIndex,
    setIsEditing,
    editingField,
    handleEditChange,
    setEditingField,
    totalWealth,
    exchangeRate
}: {
    item: Asset;
    rowIndex: number;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    editingField: { row: number; field: string } | null;
    handleEditChange: (index: number, field: string, value: string) => void;
    setEditingField: React.Dispatch<React.SetStateAction<{ row: number; field: string } | null>>;
    totalWealth: number;
    exchangeRate: any;
}) => {
    const profit = calculateProfit(item);

    const wealthPercentage = () => {
        if (item.currency === 'USD') {
            return (item.asset_qty * item.current_price * exchangeRate?.rates.BRL) / totalWealth;
        } else {
            return (item.asset_qty * item.current_price) / totalWealth;
        }
    };

    const handleEdit = (field: string) => {
        setEditingField({ row: rowIndex, field });
        setIsEditing(true);
    };

    return (
        <div
            className="grid gap-4 items-center bg-white rounded-md shadow-md p-1 pr-8 mb-2"
            style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }} // Set up 13 columns
        >
            <StyledCell>{item.asset_class}</StyledCell>
            <StyledCell>{item.asset_type}</StyledCell>
            <StyledCell>{item.asset_ticker}</StyledCell>
            <StyledCell>{item.market}</StyledCell>

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

            <StyledCell>
                <EditableCell
                    isEditing={editingField?.row === rowIndex && editingField?.field === 'avg_price'}
                    value={item.avg_price}
                    field="avg_price"
                    onEdit={() => handleEdit('avg_price')}
                    onSave={handleEditChange}
                    rowIndex={rowIndex}
                    currency={item.currency}
                />
            </StyledCell>

            <StyledCell>
                {item.current_price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: item.currency
                })}
            </StyledCell>
            <StyledCell>{item.currency}</StyledCell>
            <StyledCell>
                {(item.asset_qty * item.avg_price).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: item.currency
                })}
            </StyledCell>
            <StyledCell>
                {(item.asset_qty * item.current_price).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: item.currency
                })}
            </StyledCell>
            <ProfitIndicator profit={profit.value} />
            <ProfitIndicator profit={profit.percentage} format="percent" />
            <StyledCell>
                {wealthPercentage().toLocaleString('pt-br', {
                    style: 'percent',
                    maximumFractionDigits: 2
                })}
            </StyledCell>
            <StyledCell>{item.custody}</StyledCell>
        </div>
    );
};
