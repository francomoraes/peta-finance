import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/Modal/Modal';
import AddClassForm from '../ModalContent/AddClass';
import FormInput from './components/FormInput/FormInput';
import FormDropdown from './components/FormDropdown/FormDropdown';
import SubmitButton from './components/SubmitButton/SubmitButton';

export const AddRowForm = ({
    showNewRowInputs,
    formState,
    setFormState,
    possibleAssetClasses,
    possibleAssetTypes,
    setSelectedAssetClass,
    addRow
}: any) => {
    const { isOpen, openModal, closeModal } = useModal();

    const createClassOrType = async (newClassOrType: any) => {
        try {
            const baseUrl = import.meta.env.VITE_APP_API;
            const token = import.meta.env.VITE_USER_TOKEN;

            const response = await fetch(`${baseUrl}/asset-types`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newClassOrType)
            });

            if (!response.ok) {
                throw new Error('Failed to create asset class or type');
            }

            const result = await response.json();
            console.log('Asset class or type created successfully', result);
        } catch (error: any) {
            console.error('Error creating asset class or type', error);
        }
    };

    const onSubmitClass = (classTypeArray: any[]) => {
        classTypeArray.forEach((classOrType) => {
            createClassOrType(classOrType);
        });
        closeModal();
    };

    return (
        showNewRowInputs && (
            <>
                <form className="flex flex-wrap gap-4 items-end bg-white rounded-lg shadow-lg p-6 mb-4 border border-gray-200">
                    <FormDropdown
                        label="Asset Class"
                        formState={formState}
                        setFormState={setFormState}
                        setSelectedAssetClass={setSelectedAssetClass}
                        options={possibleAssetClasses}
                        selected={formState.asset_class}
                        openModal={openModal}
                        fieldKey="asset_class"
                    />

                    <FormDropdown
                        label="Asset Type"
                        formState={formState}
                        setFormState={setFormState}
                        options={
                            possibleAssetTypes?.[formState.asset_class] || possibleAssetTypes?.[possibleAssetClasses[0]]
                        }
                        selected={formState.asset_type}
                        openModal={openModal}
                        fieldKey="asset_type"
                    />

                    <FormDropdown
                        label="Market"
                        formState={formState}
                        setFormState={setFormState}
                        options={['B3', 'NYSE/NASDAQ', 'Crypto']}
                        selected={formState.market}
                        fieldKey="market"
                    />

                    <FormInput
                        label="Asset Ticker"
                        value={formState.asset_ticker}
                        formState={formState}
                        setFormState={setFormState}
                        fieldKey="asset_ticker"
                    />
                    <FormInput
                        label="Asset Quantity"
                        value={formState.asset_qty}
                        formState={formState}
                        setFormState={setFormState}
                        fieldKey="asset_qty"
                    />
                    <FormInput
                        label="Average Price"
                        value={formState.avg_price}
                        formState={formState}
                        setFormState={setFormState}
                        fieldKey="avg_price"
                    />
                    <FormInput
                        label="Currency"
                        value={formState.currency}
                        formState={formState}
                        setFormState={setFormState}
                        fieldKey="currency"
                    />
                    <FormInput
                        label="Custody"
                        value={formState.custody}
                        formState={formState}
                        setFormState={setFormState}
                        fieldKey="custody"
                    />

                    <SubmitButton addRow={addRow} />
                </form>
                {isOpen && (
                    <Modal closeModal={closeModal}>
                        <AddClassForm
                            onCancel={closeModal}
                            onSubmit={onSubmitClass}
                            closeModal={closeModal}
                            existingClasses={possibleAssetClasses}
                            possibleAssetTypes={possibleAssetTypes}
                        />
                    </Modal>
                )}
            </>
        )
    );
};
