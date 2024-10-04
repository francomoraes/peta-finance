export const AddRowForm = ({
    showNewRowInputs,
    formState,
    setFormState,
    possibleAssetClasses,
    possibleAssetTypes,
    setSelectedAssetClass,
    addRow
}: any) => {
    return (
        showNewRowInputs && (
            <form className="grid grid-cols-12 gap-4 items-center bg-white rounded-md shadow-md p-4 mb-2">
                <select
                    id="asset-input"
                    value={formState.asset_class}
                    onChange={(e) => {
                        if (e.target.value === 'create-new') {
                            window.alert('Creating new asset class is not supported yet');
                            return;
                        }
                        setSelectedAssetClass(e.target.value);
                        setFormState({ ...formState, asset_class: e.target.value });
                    }}
                >
                    {possibleAssetClasses.map((item: string, index: number) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                    <option value="create-new">Criar nova classe</option>
                </select>
                <select
                    id="type-input"
                    value={formState.asset_type}
                    onChange={(e) => {
                        if (e.target.value === 'create-new') {
                            window.alert('Creating new asset type is not supported yet');
                            return;
                        }
                        setFormState({ ...formState, asset_type: e.target.value });
                    }}
                >
                    {possibleAssetTypes?.[formState.asset_class]?.map((item: string, index: number) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                    <option value="create-new">Criar novo tipo</option>
                </select>
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
