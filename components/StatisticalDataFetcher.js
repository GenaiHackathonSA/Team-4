// components/StatisticalDataFetcher.js

import React, { useEffect, useState } from 'react';
import { calculateStatistics } from 'src/utils/statistic';
import UserService from 'path/to/UserService'; // Adjust the path as necessary
import AuthService from 'path/to/AuthService'; // Adjust the path as necessary
import Loader from 'path/to/Loader'; // Adjust the path as necessary
import { toast } from 'react-toastify';

const StatisticalDataFetcher = () => {
    const [data, setData] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStatisticalData = async () => {
        try {
            const response = await UserService.getMonthlySummary(AuthService.getCurrentUser().email);
            if (response.data.status === "SUCCESS") {
                const fetchedData = response.data.response;
                generateData(fetchedData);
                const stats = calculateStatistics(fetchedData);
                setStatistics(stats);
            } else {
                throw new Error("Data fetch unsuccessful");
            }
        } catch (error) {
            console.error("Failed to fetch statistical data:", error);
            setIsError(true);
            toast.error("Failed to fetch statistical data. Try again later!");
        } finally {
            setIsLoading(false);
        }
    };

    const generateData = (fetchedData) => {
        // Assuming the data structure based on the provided context
        const finalData = fetchedData.map(monthData => {
            return {
                month: monthData.month,
                totalIncome: monthData.total_income || 0,
                totalExpense: monthData.total_expense || 0
            };
        });
        setData(finalData);
    };

    useEffect(() => {
        fetchStatisticalData();
    }, []);

    if (isLoading) return <Loader />;
    if (isError) return <div>Error fetching data!</div>;

    return (
        <div>
            {/* Render components to display `data` and `statistics` */}
            <h2>Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h2>Statistics</h2>
            <pre>{JSON.stringify(statistics, null, 2)}</pre>
        </div>
    );
};

export default StatisticalDataFetcher;
