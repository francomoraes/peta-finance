import { StyledCell } from '../StyledCell';

export const TableHeader = ({ headers, handleSort }: { headers: string[]; handleSort: (field: string) => void }) => (
    <div className="grid grid-cols-12 gap-4 bg-gray-200 rounded-md p-4 mb-2">
        {headers.map((item, index) => {
            return (
                <StyledCell key={index} onClick={() => handleSort(item.toLowerCase().replace(' ', '_'))}>
                    {item}
                </StyledCell>
            );
        })}
        <StyledCell>Invested Value</StyledCell>
        <StyledCell>Current Value</StyledCell>
        <StyledCell>Profit</StyledCell>
        <StyledCell>Profit %</StyledCell>
        <StyledCell>Wallet %</StyledCell>
    </div>
);
