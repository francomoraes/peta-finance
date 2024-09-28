import { useState } from 'react';
import image from './image.png';
import { FaPencilAlt } from 'react-icons/fa';

const mockData = [
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

const possibleAssetClasses = ['Renda fixa', 'Mercado Imobiliário', 'Stocks'];

const possibleAssetTypes: { [key: string]: string[] } = {
    'Renda fixa': ['Bonds Curtos', 'Bonds Longos', 'Bonds High Yield'],
    'Mercado Imobiliário': ['Reits', 'Fundos Imobiliários'],
    Stocks: ['Stocks', 'ETFs']
};

const AssetsSpreadsheet = () => {
    const [data, setData] = useState(mockData);
    const [editData, setEditData] = useState(mockData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState<{ row: number; field: string } | null>(null);
    const [showNewRowInputs, setShowNewRowInputs] = useState(false);
    const [selectedAssetClass, setSelectedAssetClass] = useState<string>('Renda fixa');

    // New row input states
    const [newAssetType, setNewAssetType] = useState('');
    const [newAssetTicker, setNewAssetTicker] = useState('');
    const [newAssetQty, setNewAssetQty] = useState(0);
    const [newAvgPrice, setNewAvgPrice] = useState(0);
    const [newCurrentPrice, setNewCurrentPrice] = useState(0);
    const [newCurrency, setNewCurrency] = useState('');

    const headerTitles = Object.keys(mockData[0]);

    const totalWealth = mockData.reduce((acc, item) => {
        return acc + item.asset_qty * item.current_price;
    }, 0);

    const handleEditChange = (index: number, field: string, value: string) => {
        const updatedData = [...editData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: parseFloat(value) || 0
        };
        setEditData(updatedData);
    };

    const handleSave = () => {
        setData(editData);
        setIsEditing(false);
        setEditingField(null);
        // Here you can add the logic to send the updated data to the backend/database
    };

    const handleCancel = () => {
        setEditData(data);
        setIsEditing(false);
        setEditingField(null);
    };

    const addRow = () => {
        const newRow = {
            asset_class: selectedAssetClass,
            asset_type: newAssetType,
            asset_ticker: newAssetTicker,
            asset_qty: newAssetQty,
            avg_price: newAvgPrice,
            current_price: newCurrentPrice,
            currency: newCurrency
        };
        setEditData([...editData, newRow]);
        setShowNewRowInputs(false);

        // Reset new row input values after adding the row
        setNewAssetType('');
        setNewAssetTicker('');
        setNewAssetQty(0);
        setNewAvgPrice(0);
        setNewCurrentPrice(0);
        setNewCurrency('');
    };

    const generateProfit = (asset: (typeof mockData)[0]) => {
        const profit =
            ((asset.asset_qty * asset.current_price - asset.asset_qty * asset.avg_price) /
                (asset.asset_qty * asset.avg_price)) *
            100;
        if (profit > 0)
            return (
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-green-700 bg-green-100 rounded-md">
                    R$ {profit.toFixed(2)}
                </span>
            );
        if (profit < 0)
            return (
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-red-700 bg-red-100 rounded-md">
                    R$ {profit.toFixed(2)}
                </span>
            );
    };

    return (
        <div className="mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Portfolio Asset Overview</h2>

            <div className="mb-4">
                {isEditing && (
                    <div className="flex space-x-4">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-12 gap-4 bg-gray-200 rounded-md p-4 mb-2">
                {headerTitles?.map((item, index) => (
                    <span key={index} className="text-sm font-bold text-gray-700">
                        {item.replace(/_/g, ' ')}
                    </span>
                ))}
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">Invested Value</span>
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">Current Value</span>
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">Profit</span>
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">Profit %</span>
                <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">Wallet %</span>
            </div>

            {editData.map((item, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid grid-cols-12 gap-4 items-center bg-white rounded-md shadow-md p-4 mb-2"
                >
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {item.asset_class}
                    </span>
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {item.asset_type}
                    </span>
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {item.asset_ticker}
                    </span>

                    {/* Editable Quantity Field */}
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {editingField?.row === rowIndex && editingField.field === 'asset_qty' ? (
                            <input
                                type="number"
                                value={item.asset_qty}
                                onChange={(e) => handleEditChange(rowIndex, 'asset_qty', e.target.value)}
                                onBlur={() => setEditingField(null)}
                                className="border px-2 py-1 w-full rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="cursor-pointer hover:text-blue-500 flex items-center gap-2 w-full h-full"
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditingField({ row: rowIndex, field: 'asset_qty' });
                                }}
                            >
                                {item.asset_qty}
                                <FaPencilAlt width={10} height={10} />
                            </span>
                        )}
                    </span>

                    {/* Editable Average Price Field */}
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {editingField?.row === rowIndex && editingField.field === 'avg_price' ? (
                            <input
                                type="number"
                                value={item.avg_price}
                                onChange={(e) => handleEditChange(rowIndex, 'avg_price', e.target.value)}
                                onBlur={() => setEditingField(null)} // Save on blur
                                className="border px-2 py-1 w-full rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="cursor-pointer hover:text-blue-500 flex items-center gap-2 w-full h-full"
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditingField({ row: rowIndex, field: 'avg_price' });
                                }}
                            >
                                {item.avg_price}
                                <FaPencilAlt width={10} height={10} />
                            </span>
                        )}
                    </span>

                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {item.current_price}
                    </span>
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {item.currency}
                    </span>
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {(item.asset_qty * item.avg_price).toFixed(2)}
                    </span>
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {(item.asset_qty * item.current_price).toFixed(2)}
                    </span>
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {(item.asset_qty * item.current_price - item.asset_qty * item.avg_price).toFixed(2)}
                    </span>
                    {generateProfit(item)}
                    <span className="text-sm font-fold w-full text-center font-bold p-1 text-gray-700">
                        {(((item.asset_qty * item.current_price) / totalWealth) * 100).toFixed(2)}
                    </span>
                </div>
            ))}
            <button
                className={` ${
                    showNewRowInputs ? 'bg-yellow-100 text-black' : 'bg-blue-400'
                } text-white text-xl px-4 pb-2 rounded shadow-md hover:bg-gray-200 w-full leading-none relative -top-1`}
                onClick={() => {
                    setShowNewRowInputs(!showNewRowInputs);
                    setTimeout(() => document.getElementById('asset-input')?.focus(), 100);
                }}
            >
                {showNewRowInputs ? '-' : '+'}
            </button>
            {showNewRowInputs && (
                <form className="grid grid-cols-12 gap-4 items-center bg-white rounded-md shadow-md p-4 mb-2">
                    <select
                        id="asset-input"
                        value={selectedAssetClass}
                        onChange={(e) => {
                            if (e.target.value === 'create-new') {
                                window.alert('create new class');
                            }
                            if (possibleAssetClasses.includes(e.target.value)) {
                                setSelectedAssetClass(e.target.value);
                            }
                        }}
                    >
                        {possibleAssetClasses.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                        <option value="create-new">Criar nova classe</option>
                    </select>
                    <select id="type-input" value={newAssetType} onChange={(e) => setNewAssetType(e.target.value)}>
                        {possibleAssetTypes?.[selectedAssetClass]?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                        <option value="create-new">Criar novo tipo</option>
                    </select>
                    <input
                        type="text"
                        value={newAssetTicker}
                        onChange={(e) => setNewAssetTicker(e.target.value)}
                        placeholder="Asset Ticker"
                    />
                    <input
                        type="number"
                        value={newAssetQty}
                        onChange={(e) => setNewAssetQty(parseFloat(e.target.value) || 0)}
                        placeholder="Asset Quantity"
                    />
                    <input
                        type="number"
                        value={newAvgPrice}
                        onChange={(e) => setNewAvgPrice(parseFloat(e.target.value) || 0)}
                        placeholder="Average Price"
                    />
                    <input
                        type="number"
                        value={newCurrentPrice}
                        onChange={(e) => setNewCurrentPrice(parseFloat(e.target.value) || 0)}
                        placeholder="Current Price"
                    />
                    <input
                        type="text"
                        value={newCurrency}
                        onChange={(e) => setNewCurrency(e.target.value)}
                        placeholder="Currency"
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
                        onClick={(e) => {
                            e.preventDefault();
                            addRow();
                        }}
                    >
                        Add Row
                    </button>
                </form>
            )}
        </div>
    );
};

export default AssetsSpreadsheet;
