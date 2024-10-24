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
    exchangeRate,
    visibleColumns
}: {
    item: Asset;
    rowIndex: number;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    editingField: { row: number; field: string } | null;
    handleEditChange: (index: number, field: string, value: string) => void;
    setEditingField: React.Dispatch<React.SetStateAction<{ row: number; field: string } | null>>;
    totalWealth: number;
    exchangeRate: any;
    visibleColumns: string[];
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
            style={{ gridTemplateColumns: `repeat(${visibleColumns.length || 13}, minmax(0, 1fr))` }}
        >
            {visibleColumns.includes('Classe') && <StyledCell>{item.asset_class}</StyledCell>}
            {visibleColumns.includes('Tipo') && <StyledCell>{item.asset_type}</StyledCell>}
            {visibleColumns.includes('Ticker') && <StyledCell>{item.asset_ticker}</StyledCell>}
            {visibleColumns.includes('Mercado') && <StyledCell>{item.market}</StyledCell>}

            {visibleColumns.includes('QTD') && (
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
            )}
            {visibleColumns.includes('Preço Médio') && (
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
            )}

            {visibleColumns.includes('Preço Atual') && (
                <StyledCell>
                    {item.current_price.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: item.currency
                    })}
                </StyledCell>
            )}

            {visibleColumns.includes('Moeda') && <StyledCell>{item.currency}</StyledCell>}

            {visibleColumns.includes('Valor Investido') && (
                <StyledCell>
                    {(item.asset_qty * item.avg_price).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: item.currency
                    })}
                </StyledCell>
            )}

            {visibleColumns.includes('Valor Atual') && (
                <StyledCell>
                    {(item.asset_qty * item.current_price).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: item.currency
                    })}
                </StyledCell>
            )}

            {visibleColumns.includes('Lucro') && <ProfitIndicator profit={profit.value} />}

            {visibleColumns.includes('Lucro (%)') && <ProfitIndicator profit={profit.percentage} format="percent" />}

            {visibleColumns.includes('% Carteira') && (
                <StyledCell>
                    {wealthPercentage().toLocaleString('pt-br', {
                        style: 'percent',
                        maximumFractionDigits: 2
                    })}
                </StyledCell>
            )}

            {visibleColumns.includes('Custódia') && <StyledCell>{item.custody}</StyledCell>}
        </div>
    );
};
