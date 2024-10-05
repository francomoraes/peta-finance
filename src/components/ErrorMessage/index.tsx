const ErrorMessage = ({ error }: { error: { message: string } }) => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error.message}</span>
            </div>
        </div>
    );
};

export default ErrorMessage;
