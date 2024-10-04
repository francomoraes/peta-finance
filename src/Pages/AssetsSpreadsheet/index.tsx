import AssetsSpreadsheetTable from '@/components/Table';
import {
    headerTitles,
    mockData,
    possibleAssetClasses,
    possibleAssetTypes
} from '@/components/Table/fakeAssetSpreadsheetData';
import { useEffect, useState } from 'react';

const AssetsSpreadsheet = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_APP_API;
                const token =
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwMTRmODM3LWI0YmMtNGEyMC04NGNhLTVmMjc1YjQ2MTFiNyIsImVtYWlsIjoiZnJhbmtAbWFpbC5jb20iLCJpYXQiOjE3MjgwMDk4OTksImV4cCI6MTcyODA5NjI5OX0.s8JLIPKa8NEShfb6BE2jUmiCPp90vc6HYvs-jbOOD0c'; // Replace with your actual token
                const response = await fetch(`${baseUrl}/assets`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                console.log('Data fetched:', result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Portfolio Asset Overview</h2>
            <AssetsSpreadsheetTable
                mockData={mockData}
                possibleAssetClasses={possibleAssetClasses}
                possibleAssetTypes={possibleAssetTypes}
                headerTitles={headerTitles}
            />
        </div>
    );
};

export default AssetsSpreadsheet;
