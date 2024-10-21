type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
};

const fetchFunction = async (endpoint: string, { method = 'GET', body }: FetchOptions = {}) => {
    try {
        const response = await fetch(`${endpoint}`, {
            method,
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

export default fetchFunction;
