/**
 * fetchUserStatistics - Fetches user statistics required for the Statistics Page.
 * This function handles the API call to retrieve necessary data and formats it accordingly.
 * 
 * @async
 * @returns {Promise<Object>} The structured statistics data.
 * @throws {Error} Throws an error if the API call fails or the data format is incorrect.
 */
const fetchUserStatistics = async () => {
    try {
        const email = AuthService.getCurrentUser().email; // Assuming you have a method to get the current user's email
        const response = await performAPICall(email);

        // Ensure that the response format is valid
        if (!response || !response.data || !Array.isArray(response.data.monthlySummary)) {
            throw new Error('Invalid response format from API');
        }

        // Format the statistics data
        const formattedData = formatStatisticsData(response.data.monthlySummary);
        return formattedData;

    } catch (error) {
        console.error("Error fetching user statistics:", error);
        throw new Error('Failed to fetch user statistics.');
    }
};

// Assuming the existence of the performAPICall and formatStatisticsData functions
// Here's an example of what they might look like based on best practices.

const performAPICall = async (email) => {
    try {
        const response = await axios.get(
            API_BASE_URL + '/report/getMonthlySummaryByUser',
            {
                headers: AuthService.authHeader(),
                params: {
                    email: email,
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error during API call:", error);
        throw new Error('API request failed.');
    }
};

const formatStatisticsData = (monthlySummary) => {
    // Format the monthly summary data as needed
    return monthlySummary.map(item => ({
        month: item.month,
        income: item.totalIncome,
        expenses: item.totalExpenses,
        netSavings: item.netSavings,
    }));
};
