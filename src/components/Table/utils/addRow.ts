export const addRow = ({
    mockData,
    editData,
    setEditData,
    formState,
    setFormState,
    setShowNewRowInputs
}: {
    mockData: any[];
    editData: (typeof mockData)[0][];
    setEditData: React.Dispatch<React.SetStateAction<(typeof mockData)[0][]>>;
    formState: (typeof mockData)[0];
    setFormState: React.Dispatch<React.SetStateAction<(typeof mockData)[0]>>;
    setShowNewRowInputs: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    setEditData([...editData, formState]);
    setShowNewRowInputs(false);
    setFormState({
        asset_class: 'Renda fixa',
        asset_type: '',
        asset_ticker: '',
        asset_qty: 0,
        avg_price: 0,
        current_price: 0,
        currency: ''
    });
};
