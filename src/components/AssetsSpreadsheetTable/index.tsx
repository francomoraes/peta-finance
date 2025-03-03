import ActionButton from '@/components/ActionButton';
import ToggleButton from '@/components/ToggleButton';
import DeleteButton from '../DeleteButton';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { AddRowForm } from './components/AddRowForm';
import { sortData } from './utils/sorting';
import { createAsset, deleteAsset, updateAssets } from './service/assetService';
import { useEffect, useState } from 'react';
import { initialFormState } from './utils/initialFormState';
import { focusOnElement } from './utils/domUtils';
import { FaGear } from 'react-icons/fa6';

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
    headerTitles: {
        label: string;
        width: string;
    }[];
    exchangeRate: any;
}) => {
    const [data, setData] = useState<any[]>(assetsData);
    const [editData, setEditData] = useState<any[]>(assetsData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState<{ row: number; field: string } | null>(null);
    const [showNewRowInputs, setShowNewRowInputs] = useState(false);
    const [_selectedAssetClass, setSelectedAssetClass] = useState('');
    const [visibleColumns, setVisibleColumns] = useState<string[]>(headerTitles.map((header) => header.label));
    const [showSettings, setShowSettings] = useState(false);

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        const storedVisibleColumns = localStorage.getItem('visibleColumns');
        console.log('storedVisibleColumns', storedVisibleColumns);
        if (storedVisibleColumns) {
            setVisibleColumns(JSON.parse(storedVisibleColumns));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    const handleEditChange = (index: number, field: string, value: string) => {
        const updatedData = [...editData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: parseFloat(value) || 0
        };
        setEditData(updatedData);
    };

    const handleSave = () => {
        updateAssets(editData).then(() => {
            setData(editData);
            setIsEditing(false);
            setEditingField(null);
        });
    };

    const handleCancel = () => {
        setEditData(data);
        setIsEditing(false);
        setEditingField(null);
    };

    const handleDeleteRow = (index: number) => {
        if (window.confirm('Are you sure you want to delete this row?')) {
            deleteAsset(editData[index].id)
                .then(() => {
                    setEditData(editData.filter((_, i) => i !== index));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleSort = (field: string) => {
        const sortedData = sortData(editData, field);
        setEditData(sortedData);
    };

    const addRow = () => {
        setShowNewRowInputs(false);
        createAsset(formState)
            .then((newAsset) => {
                setEditData((prevData) => [...prevData, newAsset]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleToggleColumn = (columnLabel: string) => {
        setVisibleColumns((prev) =>
            prev.includes(columnLabel) ? prev.filter((col) => col !== columnLabel) : [...prev, columnLabel]
        );
    };

    const handleShowSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="table-container relative">
            <div className="absolute left-40 -top-10">
                <button onClick={handleShowSettings}>
                    <FaGear />
                </button>
                <div
                    className={`settings-container ${
                        showSettings ? 'visible' : 'hidden'
                    } flex flex-col gap-2 justify-start absolute top-0 left-6 bg-white p-4 rounded-lg shadow-lg z-10 max-h-[360px] overflow-y-auto`}
                >
                    {headerTitles.map((header) => (
                        <label key={header.label} className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={visibleColumns.includes(header.label)}
                                onChange={() => handleToggleColumn(header.label)}
                            />
                            {header.label}
                        </label>
                    ))}
                </div>
            </div>

            <TableHeader
                headers={headerTitles.filter((header) => visibleColumns.includes(header.label))}
                handleSort={handleSort}
            />

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
                        visibleColumns={visibleColumns}
                    />
                    <DeleteButton onClick={() => handleDeleteRow(rowIndex)} />
                </div>
            ))}

            <ToggleButton
                isToggled={showNewRowInputs}
                onClick={() => {
                    setShowNewRowInputs(!showNewRowInputs);
                    if (!showNewRowInputs) focusOnElement('class-input');
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
