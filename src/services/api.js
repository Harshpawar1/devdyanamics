import axios from 'axios';

const API_URL = 'http://localhost:5000/data'; // Ensure the URL is correct

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data); // Log the response to verify
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
