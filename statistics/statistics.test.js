// File: statistics/statistics.test.js

import { fetchUserStatistics } from '../services/userService';
import { performAPICall } from '../utils/api';
import { toast } from 'react-toastify';

// Mocking the performAPICall function
jest.mock('../utils/api', () => ({
    performAPICall: jest.fn(),
}));

describe('fetchUserStatistics', () => {
    it('should return statistics', async () => {
        const mockEmail = 'test@example.com';
        const mockResponse = {
            data: {
                monthlySummary: [
                    { month: 'January', income: 5000, expense: 2000 },
                    { month: 'February', income: 4000, expense: 2500 },
                ],
            },
        };

        // Set up the performAPICall mock to return the mock response
        performAPICall.mockResolvedValueOnce(mockResponse);

        // Call the function
        const result = await fetchUserStatistics(mockEmail);

        // Verify that performAPICall is called with the correct arguments
        expect(performAPICall).toHaveBeenCalledWith({
            method: 'get',
            url: '/report/getMonthlySummaryByUser',
            params: { email: mockEmail },
        });

        // Validate the response structure and content
        expect(result).toEqual(mockResponse.data);

        // Test if the result contains correct data
        expect(result.monthlySummary).toHaveLength(2);
        expect(result.monthlySummary[0]).toHaveProperty('month', 'January');
        expect(result.monthlySummary[0]).toHaveProperty('income', 5000);
        expect(result.monthlySummary[0]).toHaveProperty('expense', 2000);
    });

    it('should handle errors gracefully', async () => {
        const mockEmail = 'error@example.com';
        const mockError = new Error('Network Error');

        // Set up the performAPICall mock to throw an error
        performAPICall.mockRejectedValueOnce(mockError);

        // Call the function and expect it to throw an error
        await expect(fetchUserStatistics(mockEmail)).rejects.toThrow('Network Error');

        // Verify that toast is called with the correct message
        expect(toast.error).toHaveBeenCalledWith("Failed to fetch information. Try again later!");
    });
});
