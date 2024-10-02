import { Hex } from 'viem';
import { getData, postData, deleteData } from '../utils/fetch';

// Define the base URL of your API
// const BASE_URL = 'https://api.usezero.xyz';
const BASE_URL = 'http://localhost:8080'; // Change to your actual API base URL

// Helper function to get headers with Bearer token
const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ZENGUARD_API_KEY}`
});

// Define the type for the schedule job payload
interface ScheduleJobPayload {
    trigger: {
        startTime: number;
        endTime: number;
        interval: number;
    };
    data: {
        call: {
            data: string;
            to: string;
            value: number;
        };
        chainId: string;
        account: string;
    };
}

// Schedule a new job
export const scheduleJob = async (payload: ScheduleJobPayload) => {
    try {
        const response = await postData(`${BASE_URL}/create`, payload, getHeaders());
        return response;
    } catch (error) {
        console.error('Error scheduling job:', error);
        throw error;
    }
};

// Cancel an existing job
export const cancelJob = async (jobId: string) => {
    try {
        const response = await deleteData(`${BASE_URL}/cancel/${jobId}`, getHeaders());
        return response;
    } catch (error) {
        console.error('Error canceling job:', error);
        throw error;
    }
};

// Fetch all jobs
export const getAllJobs = async () => {
    try {
        const response = await getData(`${BASE_URL}/jobs`, getHeaders());
        return response;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Define the interface for the details response
interface DetailsResponse {
    address: string;
    supportedChains: number[];
}

export const getDetails = async (): Promise<DetailsResponse> => {
    try {
        const response = await getData(`${BASE_URL}/details`, getHeaders());
        console.log(response)
        return response as DetailsResponse;
    } catch (error) {
        console.error('Error fetching details:', error);
        throw error;
    }
};
