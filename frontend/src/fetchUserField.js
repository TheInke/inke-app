import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Utility function to fetch user data fields
export const fetchUserField = async (field) => {
  // If the field is 'pfp_image', return a default image URL for now
  if (field === 'pfp_image') {
    return 'https://www.shutterstock.com/shutterstock/videos/1086926591/thumb/12.jpg?ip=x480';
  }

  try {
    // Get the access token and user ID from AsyncStorage
    const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');

    // If either the token or user ID is missing, throw an error
    if (!access_token || !userId) {
      throw new Error('Missing access token or user ID');
    }

    // Make the API request to fetch user data
    const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Check if the requested field exists in the response data
    if (response.data && response.data.hasOwnProperty(field)) {
      return response.data[field];
    } else {
      throw new Error(`Field ${field} does not exist in user data`);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
