import ActionButton from '@/components/ActionButton';
import ToggleButton from '@/components/ToggleButton';
import { useEffect, useState } from 'react';
import DeleteButton from '../DeleteButton';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { AddRowForm } from './components/AddRowForm';

const AssetsSpreadsheetTable = ({
    assetsData,
    totalWealth,
    possibleAssetClasses,
    possibleAssetTypes,
    headerTitles,
    exchangeRate
}: {
    assetsData: any[];
    totalWealth: number;
    possibleAssetClasses: string[];
    possibleAssetTypes: { [key: string]: string[] };
    headerTitles: string[];
    exchangeRate: any;
}) => {
    const [data, setData] = useState<any[]>([]);
    const [editData, setEditData] = useState<any[]>([]);
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

    useEffect(() => {
        if (assetsData) {
            setData(assetsData);
            setEditData(assetsData);
        }
    }, [assetsData]);

    const handleEditChange = (index: number, field: string, value: string) => {
        const updatedData = [...editData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: parseFloat(value) || 0
        };
        setEditData(updatedData);
    };

    const updateAssets = async (updatedAssets: any[]) => {
        try {
            const baseUrl = import.meta.env.VITE_APP_API;
            const token = import.meta.env.VITE_USER_TOKEN;

            const response = await fetch(`${baseUrl}/assets`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedAssets)
            });

            if (!response.ok) {
                throw new Error('Failed to update assets');
            }

            const result = await response.json();
            console.log('Assets updated successfully', result);
        } catch (error: any) {
            console.error('Error updating assets', error);
        }
    };

    const handleSave = () => {
        setData(editData);
        setIsEditing(false);
        setEditingField(null);
        updateAssets(editData);
    };

    const handleCancel = () => {
        setEditData(data);
        setIsEditing(false);
        setEditingField(null);
    };

    const createAsset = async (newAsset: any) => {
        try {
            const baseUrl = import.meta.env.VITE_APP_API;
            const token = import.meta.env.VITE_USER_TOKEN;

            const response = await fetch(`${baseUrl}/assets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newAsset)
            });

            if (!response.ok) {
                throw new Error('Failed to create asset');
            }

            const result = await response.json();
            console.log('Asset created successfully', result);

            setEditData((prevData) => [...prevData, result]);
        } catch (error: any) {
            console.error('Error creating asset', error);
        }
    };

    const addRow = () => {
        console.log('formState', formState);
        setShowNewRowInputs(false);
        createAsset(formState);
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

    const deleteAsset = async (assetId: string) => {
        try {
            const baseUrl = import.meta.env.VITE_APP_API;
            const token = import.meta.env.VITE_USER_TOKEN;

            const response = await fetch(`${baseUrl}/assets/${assetId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete asset');
            }

            const result = await response.json();
            console.log('Asset deleted successfully', result);
        } catch (error: any) {
            console.error('Error deleting asset', error);
        }
    };

    const handleDeleteRow = (index: number) => {
        window.confirm('Are you sure you want to delete this row?') &&
            deleteAsset(editData[index].id).then(() => {
                setEditData(editData.filter((_, i) => i !== index));
            });
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
                        exchangeRate={exchangeRate}
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
