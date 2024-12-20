import React, { createContext, useContext, useState, useEffect } from 'react';
import { set_cache, get_cache } from '../data_cache.py';

// Create a Context for user statistics
const UserStatsContext = createContext();

// Create a custom Provider component
export const UserStatsProvider = ({ children }) => {
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user statistics from cache
        const fetchUserStats = async () => {
            try {
                const cachedStats = await get_cache('user_stats');
                if (cachedStats) {
                    setUserStats(cachedStats);
                }
            } catch (err) {
                setError('Failed to load user statistics from cache');
            } finally {
                setLoading(false);
            }
        };
        fetchUserStats();
    }, []);

    const updateUserStats = async (newStats) => {
        try {
            setUserStats(prevStats => ({ ...prevStats, ...newStats }));
            await set_cache('user_stats', { ...userStats, ...newStats });
        } catch (err) {
            setError('Failed to update user statistics');
        }
    };

    return (
        <UserStatsContext.Provider value={{ userStats, loading, error, updateUserStats }}>
            {children}
        </UserStatsContext.Provider>
    );
};

// Custom hook to use the UserStatsContext
export const useUserStats = () => {
    const context = useContext(UserStatsContext);
    if (!context) {
        throw new Error('useUserStats must be used within a UserStatsProvider');
    }
    return context;
};

// Function to create User Statistics Context
export const createUserStatsContext = () => {
    return <UserStatsProvider />;
};
