export const StyledCell = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <div className="tableCell">
        <span onClick={onClick} className="truncate">
            {children}
        </span>
    </div>
);
