import fetchWithAuth from '@/utils/fetchWithAuth';

export const updateAssets = async (updatedAssets: any[]) => {
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

    if (!response.ok) throw new Error('Failed to update assets');
    return response.json();
};

export const createAsset = async (newAsset: any) => {
    return await fetchWithAuth('/assets', { method: 'POST', body: newAsset });
};

export const deleteAsset = async (assetId: string) => {
    const baseUrl = import.meta.env.VITE_APP_API;
    const token = import.meta.env.VITE_USER_TOKEN;

    const response = await fetch(`${baseUrl}/assets/${assetId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error('Failed to delete asset');
    return response.json();
};
