export const mockData = [
    {
        asset_class: 'Renda fixa',
        asset_type: 'Bonds Curtos',
        asset_ticker: 'SHV',
        asset_qty: 23.28,
        avg_price: 110.35,
        current_price: 110.58,
        currency: 'USD'
    },
    {
        asset_class: 'Mercado Imobiliário',
        asset_type: 'Reits',
        asset_ticker: 'VNQ',
        asset_qty: 20,
        avg_price: 100.0,
        current_price: 110.0,
        currency: 'USD'
    },
    {
        asset_class: 'Stocks',
        asset_type: 'Stocks',
        asset_ticker: 'EWH',
        asset_qty: 50,
        avg_price: 110.0,
        current_price: 120.0,
        currency: 'USD'
    }
];

export const headerTitles = ['Class', 'Type', 'Ticker', 'QTD', 'Preço Médio', 'Preço Atual', 'Moeda'];

export const possibleAssetClasses = ['Renda fixa', 'Mercado Imobiliário', 'Stocks'];

export const possibleAssetTypes: { [key: string]: string[] } = {
    'Renda fixa': ['Bonds Curtos', 'Bonds Longos', 'Bonds High Yield'],
    'Mercado Imobiliário': ['Reits', 'Fundos Imobiliários'],
    Stocks: ['Stocks', 'ETFs']
};
