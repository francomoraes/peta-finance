import { Asset } from '../types';

export const calculateProfit = (asset: Asset): number => {
    return (
        ((asset.asset_qty * asset.current_price - asset.asset_qty * asset.avg_price) /
            (asset.asset_qty * asset.avg_price)) *
        100
    );
};
