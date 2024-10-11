import { Asset } from '@/components/AssetsSpreadsheetTable/types';
import { useEffect, useState } from 'react';

const useFetchAssets = ({ fetchUrl, token }: { fetchUrl: string; token: string }) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await fetch(fetchUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch assets');
                }

                const data = await response.json();
                setAssets(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssets();
    }, [fetchUrl, token]);

    const totalWealth = assets.reduce((acc, item) => {
        return acc + item.asset_qty * item.current_price;
    }, 0);

    return { assets, totalWealth, isLoading, error };
};

export default useFetchAssets;
