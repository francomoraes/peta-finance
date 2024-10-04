import ActionButton from '@/components/ActionButton';
import { AddRowForm } from '@/components/Table/components/AddRowForm';
import { TableHeader } from '@/components/Table/components/TableHeader';
import { TableRow } from '@/components/Table/components/TableRow';
import ToggleButton from '@/components/ToggleButton';
import { useState } from 'react';
import DeleteButton from '../DeleteButton';

const AssetsSpreadsheetTable = ({
    mockData,
    possibleAssetClasses,
    possibleAssetTypes,
    headerTitles
}: {
    mockData: any[];
    possibleAssetClasses: string[];
    possibleAssetTypes: { [key: string]: string[] };
    headerTitles: string[];
}) => {
    const [data, setData] = useState(mockData);
    const [editData, setEditData] = useState(mockData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState<{ row: number; field: string } | null>(null);
    const [showNewRowInputs, setShowNewRowInputs] = useState(false);
    const [_selectedAssetClass, setSelectedAssetClass] = useState('');

    const [formState, setFormState] = useState({
        asset_class: 'Renda fixa',
        asset_type: '',
        asset_ticker: '',
        asset_qty: 0,
        avg_price: 0,
        current_price: 0,
        currency: ''
    });

    // Update total wealth calculation
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
    };

    const handleCancel = () => {
        setEditData(data);
        setIsEditing(false);
        setEditingField(null);
    };
    const addRow = () => {
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

    const handleDeleteRow = (index: number) => {
        window.confirm('Are you sure you want to delete this row?') &&
            setEditData(editData.filter((_, i) => i !== index));
    };

    const handleSort = (field: string) => {
        const sortedData = [...editData].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setEditData(sortedData);
    };

    return (
        <div className="table-container">
            <TableHeader headers={headerTitles} handleSort={handleSort} />

            {editData?.map((item, rowIndex) => (
                <div className="relative" key={rowIndex}>
                    <TableRow
                        item={item}
                        rowIndex={rowIndex}
                        editingField={editingField}
                        handleEditChange={handleEditChange}
                        setEditingField={setEditingField}
                        setIsEditing={setIsEditing}
                        totalWealth={totalWealth}
                    />
                    <DeleteButton onClick={() => handleDeleteRow(rowIndex)} />
                </div>
            ))}

            <ToggleButton
                isToggled={showNewRowInputs}
                onClick={() => {
                    setShowNewRowInputs(!showNewRowInputs);
                    setTimeout(() => document.getElementById('class-input')?.focus(), 100);
                }}
            />
            <AddRowForm
                showNewRowInputs={showNewRowInputs}
                formState={formState}
                setFormState={setFormState}
                possibleAssetClasses={possibleAssetClasses}
                possibleAssetTypes={possibleAssetTypes}
                setSelectedAssetClass={setSelectedAssetClass}
                addRow={addRow}
            />
            {isEditing && (
                <div className="flex space-x-4 my-4">
                    <ActionButton type="save" onClick={handleSave} />
                    <ActionButton type="cancel" onClick={handleCancel} />
                </div>
            )}
        </div>
    );
};

export default AssetsSpreadsheetTable;
