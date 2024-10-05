import AssetsSpreadsheetTable from '@/components/AssetsSpreadsheetTable';
import useFetchAssets from './hooks/useFetchAssets';
import { headerTitles } from '@/components/AssetsSpreadsheetTable/fakeAssetSpreadsheetData';
import ErrorMessage from '@/components/ErrorMessage';
import SpinnerLoader from '@/components/SpinnerLoader';

const AssetsSpreadsheet = () => {
    const token = import.meta.env.VITE_USER_TOKEN;

    const { assets, possibleClasses, possibleTypes, totalWealth, isLoading, error } = useFetchAssets({
        fetchUrl: `${import.meta.env.VITE_APP_API}/assets`,
        token
    });

    if (isLoading) return <SpinnerLoader />;

    if (error) return <ErrorMessage error={error} />;

    return (
        <div className="mx-auto p-3 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Portfolio Asset Overview</h2>
            <AssetsSpreadsheetTable
                assetsData={assets}
                totalWealth={totalWealth}
                possibleAssetClasses={possibleClasses}
                possibleAssetTypes={possibleTypes}
                headerTitles={headerTitles}
            />
        </div>
    );
};

export default AssetsSpreadsheet;
