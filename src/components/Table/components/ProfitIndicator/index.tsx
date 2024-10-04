import { formatCurrency } from '../../utils/formatCurrency';
import { StyledCell } from '../StyledCell';

export const ProfitIndicator = ({ profit }: { profit: number }) => {
    const profitClass = profit > 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100';
    return <StyledCell>{<span className={`font-bold p-1 ${profitClass}`}>{formatCurrency(profit)}</span>}</StyledCell>;
};
