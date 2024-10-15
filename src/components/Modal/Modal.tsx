import { createPortal } from 'react-dom';

interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        closeModal();
    };

    const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return createPortal(
        <div
            className="fixed left-0 top-0 z-[1051] h-full w-full bg-black bg-opacity-50"
            onClick={handleBackgroundClick}
        >
            <div
                className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform"
                onClick={handleContentClick}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};
