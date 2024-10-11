import { useEffect, useState } from 'react';

const useFetchClasses = ({ fetchUrl, token }: { fetchUrl: string; token: string }) => {
    const [classes, setClasses] = useState<string[]>([]);
    const [types, setTypes] = useState<{ [key: string]: string[] }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(fetchUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch classes');
                }

                const data: any[] = await response.json();
                console.log('data', data);
                const tempClasses = new Set(data.map((item: any) => item.asset_class as string));

                setClasses(Array.from(tempClasses));

                const tempTypes = data.reduce((acc: any, item: any) => {
                    if (!acc[item.asset_class]) {
                        acc[item.asset_class] = [];
                    }

                    acc[item.asset_class].push(item.asset_type);

                    return acc;
                }, {});

                setTypes(tempTypes);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, [fetchUrl, token]);

    return { classes, types, isLoading, error };
};

export default useFetchClasses;
