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

    const possibleClasses = assets?.map((asset) => asset.asset_class) || [];

    const possibleTypes = assets?.reduce((acc, asset) => {
        const { asset_class, asset_type } = asset;

        if (!acc[asset_class]) {
            acc[asset_class] = [];
        }

        if (!acc[asset_class].includes(asset_type)) {
            acc[asset_class].push(asset_type);
        }

        return acc;
    }, {} as Record<string, string[]>);

    const transformedAssets = assets.map((asset) => {
        return {
            ...asset,
            current_price: asset.avg_price * (1 + Math.random() * 0.1 - 0.05)
        };
    });

    const totalWealth = transformedAssets.reduce((acc, item) => {
        return acc + item.asset_qty * item.current_price;
    }, 0);

    return { assets: transformedAssets, totalWealth, possibleClasses, possibleTypes, isLoading, error };
};

export default useFetchAssets;
