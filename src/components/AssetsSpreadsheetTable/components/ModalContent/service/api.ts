export const createClassOrType = async (newClassOrType: any) => {
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

    return await response.json();
};

export const deleteTypes = async (asset_class: string, asset_type: string[]) => {
    const baseUrl = import.meta.env.VITE_APP_API;
    const token = import.meta.env.VITE_USER_TOKEN;

    const response = await fetch(`${baseUrl}/asset-types`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ asset_class, asset_type })
    });

    if (!response.ok) {
        throw new Error('Failed to delete asset types');
    }

    return await response.json();
};
