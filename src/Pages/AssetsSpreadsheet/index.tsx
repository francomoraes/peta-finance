import AssetsSpreadsheetTable from '@/components/AssetsSpreadsheetTable';
import useFetchAssets from './hooks/useFetchAssets';
import ErrorMessage from '@/components/ErrorMessage';
import SpinnerLoader from '@/components/SpinnerLoader';
import useFetchClasses from './hooks/useFetchClasses';
import { useAuth } from '@/hooks/useAuth';
import { headerTitles } from './utils/headerTitles';

const AssetsSpreadsheet = () => {
    const { user } = useAuth();

    const { assets, totalWealth, isLoading, error, exchangeRate } = useFetchAssets({
        fetchUrl: `${import.meta.env.VITE_APP_API}/assets`,
        token: user?.token ? user.token : undefined
    });

    const { classes, types } = useFetchClasses({
        fetchUrl: `${import.meta.env.VITE_APP_API}/asset-types`,
        token: user?.token ? user.token : undefined
    });

    if (isLoading) return <SpinnerLoader />;

    if (error) return <ErrorMessage error={error} />;

    return (
        <div className="mx-auto p-3 bg-gray-100 rounded-lg shadow-lg flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-4">Portfolio Asset Overview</h2>
            <div>
                <h3 className=" text-lg font-semibold mb-4 text-gray-600">Ativos de mercado</h3>
                <AssetsSpreadsheetTable
                    assetsData={assets}
                    totalWealth={totalWealth}
                    possibleAssetClasses={classes}
                    possibleAssetTypes={types}
                    headerTitles={headerTitles}
                    exchangeRate={exchangeRate}
                />
            </div>
            <div>
                <h3 className=" text-lg font-semibold mb-4 text-gray-600">Ativos de vencimento</h3>
                {/* <AssetsSpreadsheetTable
                    assetsData={assets}
                    totalWealth={totalWealth}
                    possibleAssetClasses={classes}
                    possibleAssetTypes={types}
                    headerTitles={headerTitles}
                    exchangeRate={exchangeRate}
                /> */}
            </div>
        </div>
    );
};

export default AssetsSpreadsheet;
