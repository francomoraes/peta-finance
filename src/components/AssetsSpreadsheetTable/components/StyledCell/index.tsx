export const StyledCell = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <span onClick={onClick} className="tableCell">
        {children}
    </span>
);
