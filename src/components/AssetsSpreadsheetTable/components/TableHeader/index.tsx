import { StyledCell } from '../StyledCell';

export const TableHeader = ({
    headers,
    handleSort
}: {
    headers: {
        label: string;
        width: string;
    }[];
    handleSort: (field: string) => void;
}) => (
    <div
        className="grid gap-4 bg-gray-200 rounded-md p-4 pr-8 py-1 mb-2 shadow-md"
        style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }} // Set up 13 columns
    >
        {headers.map((item, index) => {
            return (
                <StyledCell
                    key={index}
                    onClick={() => handleSort(item.label.toLowerCase().replace(' ', '_'))}
                    style={{ width: item.width }} // Apply dynamic width
                >
                    {item.label}
                </StyledCell>
            );
        })}
    </div>
);
