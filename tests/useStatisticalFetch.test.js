import { renderHook, act } from '@testing-library/react-hooks';
import { useStatisticalFetch } from '../hooks/useStatisticalFetch';
import { fetchStatisticalData } from '../utils/statistic';
import { toast } from 'react-toastify';

jest.mock('../utils/statistic', () => ({
    fetchStatisticalData: jest.fn(),
}));

describe('useStatisticalFetch', () => {
    it('should manage loading and data state correctly', async () => {
        const mockData = { /* mock data structure based on requirements */ };
        const mockStatistics = { /* mock statistics structure based on requirements */ };

        // Setting up the fetchStatisticalData mock to return resolved promise
        fetchStatisticalData.mockResolvedValueOnce({ data: mockData, statistics: mockStatistics });

        const { result, waitForNextUpdate } = renderHook(() => useStatisticalFetch());

        // Initially, loading should be true
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
        
        // Wait for the next update when data is fetched
        await waitForNextUpdate();

        // After fetching, check that loading is false and data is set correctly
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.statistics).toEqual(mockStatistics);
        expect(result.current.error).toBe(null);
    });

    it('should handle errors correctly', async () => {
        const errorMessage = 'Failed to fetch data!';
        fetchStatisticalData.mockRejectedValueOnce(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(() => useStatisticalFetch());

        // Wait for the next update when error is encountered
        await waitForNextUpdate();

        // After error, check that loading is false and error is set correctly
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(errorMessage);

        // Ensure that a toast is shown in case of error
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
});
