import { getData, postData, deleteData } from '../utils/fetch';

// Define the base URL of your API
const BASE_URL = 'https://api.usezero.xyz'; // Change to your actual API base URL

// Schedule a new job
export const scheduleJob = async (sessionId: string) => {
    try {
        const response = await postData(`${BASE_URL}/schedule`, { sessionId });
        return response;
    } catch (error) {
        console.error('Error scheduling job:', error);
        throw error;
    }
};

// Cancel an existing job
export const cancelJob = async (jobId: string) => {
    try {
        const response = await deleteData(`${BASE_URL}/cancel/${jobId}`);
        return response;
    } catch (error) {
        console.error('Error canceling job:', error);
        throw error;
    }
};

// Fetch all jobs
export const getAllJobs = async () => {
    try {
        const response = await getData(`${BASE_URL}/jobs`);
        return response;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};
