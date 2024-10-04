export const StyledCell = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <span onClick={onClick} className="table-cell">
        {children}
    </span>
);
