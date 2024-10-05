import { StyledCell } from '../StyledCell';

export const TableHeader = ({ headers, handleSort }: { headers: string[]; handleSort: (field: string) => void }) => (
    <div className="grid grid-cols-12 gap-4 bg-gray-200 rounded-md p-4 pr-8 py-1 mb-2 shadow-md">
        {headers.map((item, index) => {
            return (
                <StyledCell key={index} onClick={() => handleSort(item.toLowerCase().replace(' ', '_'))}>
                    {item}
                </StyledCell>
            );
        })}
        <StyledCell>Valor Investido</StyledCell>
        <StyledCell>Valor Atual</StyledCell>
        <StyledCell>Lucro</StyledCell>
        <StyledCell>Lucro %</StyledCell>
        <StyledCell>% Carteira</StyledCell>
    </div>
);
