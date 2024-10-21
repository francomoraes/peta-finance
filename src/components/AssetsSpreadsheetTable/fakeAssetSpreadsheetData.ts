export const mockData = [
    {
        asset_class: 'Renda fixa',
        asset_type: 'Bonds Curtos',
        asset_ticker: 'SHV',
        market: 'NYSE/NASDAQ',
        asset_qty: 23.28,
        avg_price: 110.35,
        current_price: 110.58,
        currency: 'USD'
    },
    {
        asset_class: 'Mercado Imobiliário',
        asset_type: 'Reits',
        asset_ticker: 'VNQ',
        market: 'NYSE/NASDAQ',
        asset_qty: 20,
        avg_price: 100.0,
        current_price: 110.0,
        currency: 'USD'
    },
    {
        asset_class: 'Stocks',
        asset_type: 'Stocks',
        asset_ticker: 'EWH',
        market: 'NYSE/NASDAQ',
        asset_qty: 50,
        avg_price: 110.0,
        current_price: 120.0,
        currency: 'USD'
    }
];

export const headerTitles = [
    { label: 'Classe', width: '20%' },
    { label: 'Tipo', width: '15%' },
    { label: 'Ticker', width: '10%' },
    { label: 'Mercado', width: '15%' },
    { label: 'QTD', width: '10%' },
    { label: 'Preço Médio', width: '10%' },
    { label: 'Preço Atual', width: '10%' },
    { label: 'Moeda', width: '10%' },
    { label: 'Valor Investido', width: '10%' },
    { label: 'Valor Atual', width: '10%' },
    { label: 'Lucro', width: '10%' },
    { label: 'Lucro %', width: '10%' },
    { label: '% Carteira', width: '10%' },
    { label: 'Custódia', width: '10%' }
];

export const possibleAssetClasses = ['Renda fixa', 'Mercado Imobiliário', 'Stocks'];

export const possibleAssetTypes: { [key: string]: string[] } = {
    'Renda fixa': ['Bonds Curtos', 'Bonds Longos', 'Bonds High Yield'],
    'Mercado Imobiliário': ['Reits', 'Fundos Imobiliários'],
    Stocks: ['Stocks', 'ETFs']
};
