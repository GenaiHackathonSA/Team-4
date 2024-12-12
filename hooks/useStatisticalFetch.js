// hooks/useStatisticalFetch.js

import { useState, useEffect } from 'react';
import { fetchStatisticalData } from '../utils/statistic';

const useStatisticalFetch = () => {
    const [data, setData] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data and statistics
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const fetchedData = await fetchStatisticalData();
            setData(fetchedData.data);

            // Process the fetched data to calculate statistics
            const stats = await calculateStatistics(fetchedData.data);
            setStatistics(stats);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this will run once on component mount

    return { data, statistics, loading, error };
};

export default useStatisticalFetch;
