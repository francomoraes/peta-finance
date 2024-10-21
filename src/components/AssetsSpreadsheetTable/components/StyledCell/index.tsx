export const StyledCell = ({
    children,
    onClick,
    style
}: {
    children: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
}) => (
    <div className="tableCell" style={style}>
        <span onClick={onClick} className={`truncate`}>
            {children}
        </span>
    </div>
);
