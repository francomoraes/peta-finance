import { Asset } from '@/components/AssetsSpreadsheetTable/types';
import { useEffect, useState } from 'react';

const useFetchAssets = ({ fetchUrl, token }: { fetchUrl: string; token?: string }) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [exchangeRate, setExchangeRate] = useState<any>();
    const [totalWealth, setTotalWealth] = useState(0);

    useEffect(() => {
        const fetchAssets = async () => {
            if (!token) {
                console.warn('No token provided');
                return;
            }

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

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

                if (!response.ok) {
                    throw new Error('Failed to fetch exchange rate');
                }

                const data = await response.json();
                setExchangeRate(data);
            } catch (error: any) {
                console.error('Error fetching exchange rate', error);
            }
        };

        fetchExchangeRate();
    }, [assets]);

    useEffect(() => {
        if (exchangeRate) {
            const totalWealth = assets.reduce((acc, asset) => {
                const assetValue = asset.current_price * asset.asset_qty;
                const assetValueInBrl = asset.currency === 'USD' ? assetValue * exchangeRate.rates.BRL : assetValue;
                return acc + assetValueInBrl;
            }, 0);

            setTotalWealth(totalWealth);
        }
    }, [exchangeRate]);

    return { assets, totalWealth, isLoading, error, exchangeRate };
};

export default useFetchAssets;
