import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StatisticalDataFetcher from '../components/StatisticalDataFetcher';
import { fetchStatisticalData } from '../utils/statistic';
import { useEffect } from 'react';

// Mocking the fetchStatisticalData function
jest.mock('../utils/statistic', () => ({
    fetchStatisticalData: jest.fn(),
}));

describe('StatisticalDataFetcher', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchStatisticalData processes fetched data and integrates statistical insights', async () => {
        // Given
        const mockData = [{ value: 10 }, { value: 20 }];
        const mockStatistics = { average: 15 };
        fetchStatisticalData.mockResolvedValueOnce({ data: mockData, statistics: mockStatistics });

        render(<StatisticalDataFetcher />);
        
        // When
        await waitFor(() => {
            expect(fetchStatisticalData).toHaveBeenCalledTimes(1);
        });

        // Then
        expect(screen.getByText(/average: 15/i)).toBeInTheDocument();
        expect(screen.getByText(/data fetched successfully/i)).toBeInTheDocument(); // Assuming we have this message in our component when data is loaded correctly
    });

    test('useEffect triggers statistical data fetching on component mount', async () => {
        // Given
        render(<StatisticalDataFetcher />);
        
        // Initial expectation that fetchStatisticalData is called on mount
        expect(fetchStatisticalData).toHaveBeenCalled();
        
        // Ensure that loading message is rendered during the fetching process
        expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Assuming there's a loading message
        
        // Await for the loading to finish and data to be processed
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });
    });
});
