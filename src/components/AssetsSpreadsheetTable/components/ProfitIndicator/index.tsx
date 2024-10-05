import { formatCurrency } from '../../utils/formatCurrency';
import { StyledCell } from '../StyledCell';

export const ProfitIndicator = ({
    profit,
    format = 'currency'
}: {
    profit: number;
    format?: 'percent' | 'currency';
}) => {
    const profitClass = profit > 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100';
    return (
        <StyledCell>
            {
                <span className={`font-bold p-1 whitespace-nowrap ${profitClass}`}>
                    {format === 'currency'
                        ? formatCurrency(profit)
                        : profit.toLocaleString('pt-br', {
                              style: 'percent',
                              maximumFractionDigits: 2
                          })}
                </span>
            }
        </StyledCell>
    );
};
