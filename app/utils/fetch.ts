// fetchUtils.ts

/**
 * Makes a GET request to the specified URL
 * @param {string} url - The URL to send the GET request to
 * @param {HeadersInit} [headers] - Optional headers to include in the request
 * @returns {Promise<any>} A promise that resolves with the response data
 */
export const getData = async (url: string, headers?: HeadersInit): Promise<any> => {
    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getData:', error);
        throw error;
    }
};

/**
 * Makes a POST request to the specified URL with the given data
 * @param {string} url - The URL to send the POST request to
 * @param {object} data - The data to send in the request body
 * @param {HeadersInit} [headers] - Optional headers to include in the request
 * @returns {Promise<any>} A promise that resolves with the response data
 */
export const postData = async (url: string, data: object, headers?: HeadersInit): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
};

/**
 * Makes a DELETE request to the specified URL
 * @param {string} url - The URL to send the DELETE request to
 * @param {HeadersInit} [headers] - Optional headers to include in the request
 * @returns {Promise<any>} A promise that resolves with the response data
 */
export const deleteData = async (url: string, headers?: HeadersInit): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in deleteData:', error);
        throw error;
    }
};

// You can add more utility functions here as needed, such as:
// export const putData = async (url: string, data: object): Promise<any> => { ... }
