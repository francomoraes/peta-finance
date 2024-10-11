import ClassDropdown from './components/ClassDropdown/Classdropdown';

export const AddRowForm = ({
    showNewRowInputs,
    formState,
    setFormState,
    possibleAssetClasses,
    possibleAssetTypes,
    setSelectedAssetClass,
    addRow
}: any) => {
    console.log('possibleAssetClasses', possibleAssetClasses);
    console.log('possibleAssetTypes', possibleAssetTypes[possibleAssetClasses[0]]);

    return (
        showNewRowInputs && (
            <form className="flex gap-4 items-center bg-white rounded-md shadow-md p-4 mb-2 [&>input]:max-w-[100px]">
                <ClassDropdown
                    label="Asset Class"
                    options={possibleAssetClasses}
                    selected={formState.asset_class}
                    onSelect={(value: string) => {
                        if (value === 'create-new') {
                            window.alert('Creating new asset class is not supported yet');
                            return;
                        }
                        setSelectedAssetClass(value);
                        setFormState({ ...formState, asset_class: value });
                    }}
                />
                <ClassDropdown
                    label="Asset Type"
                    options={
                        possibleAssetTypes?.[formState.asset_class] || possibleAssetTypes?.[possibleAssetClasses[0]]
                    }
                    selected={formState.asset_type}
                    onSelect={(value: string) => {
                        if (value === 'create-new') {
                            window.alert('Creating new asset type is not supported yet');
                            return;
                        }
                        setFormState({ ...formState, asset_type: value });
                    }}
                />
                <input
                    type="text"
                    value={formState.asset_ticker}
                    onChange={(e) => setFormState({ ...formState, asset_ticker: e.target.value })}
                    placeholder="Asset Ticker"
                />
                <input
                    type="number"
                    value={formState.asset_qty}
                    onChange={(e) => setFormState({ ...formState, asset_qty: parseFloat(e.target.value) || 0 })}
                    placeholder="Asset Quantity"
                />
                <input
                    type="number"
                    value={formState.avg_price}
                    onChange={(e) => setFormState({ ...formState, avg_price: parseFloat(e.target.value) || 0 })}
                    placeholder="Average Price"
                />
                <input
                    type="number"
                    value={formState.current_price}
                    onChange={(e) => setFormState({ ...formState, current_price: parseFloat(e.target.value) || 0 })}
                    placeholder="Current Price"
                />
                <input
                    type="text"
                    value={formState.currency}
                    onChange={(e) => setFormState({ ...formState, currency: e.target.value })}
                    placeholder="Currency"
                />
                <input
                    type="text"
                    value={formState.custody}
                    onChange={(e) => setFormState({ ...formState, custody: e.target.value })}
                    placeholder="Custody"
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
        )
    );
};
