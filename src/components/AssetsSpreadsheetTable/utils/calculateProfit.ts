import { Asset } from '../types';

export const calculateProfit = (
    asset: Asset
): {
    value: number;
    percentage: number;
} => {
    const value = asset.asset_qty * asset.current_price - asset.asset_qty * asset.avg_price;
    const percentage = value / (asset.asset_qty * asset.avg_price);

    return { value, percentage };
};
