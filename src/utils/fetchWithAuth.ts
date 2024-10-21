type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
};

const fetchWithAuth = async (endpoint: string, { method = 'GET', body }: FetchOptions = {}) => {
    try {
        const baseUrl = import.meta.env.VITE_APP_API;
        const token = import.meta.env.VITE_USER_TOKEN;

        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Request failed');
        }

        return await response.json();
    } catch (error: any) {
        console.error(`Error with ${method} request to ${endpoint}`, error);
        throw error;
    }
};

export default fetchWithAuth;
