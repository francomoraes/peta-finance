export const sortData = (data: any[], field: string): any[] => {
    return [...data].sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
    });
};
