import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useFetchUserField = (field) => {
  const [data, setData] = useState(null); // Holds the field data or `false`
  const [error, setError] = useState(false); // Used to track if an error occurred

  useEffect(() => {
    const fetchUserField = async () => {
      try {
        // Get the access token and user ID from AsyncStorage
        const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
        const userId = await AsyncStorage.getItem('USER_ID');

        // If either the token or user ID is missing, set error to `true`
        if (!access_token || !userId) {
          setError(true);
          setData(false);
          return;
        }

        // Make the API request
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        // Check if the field exists in the response data
        if (response.data && response.data.hasOwnProperty(field)) {
          setData(response.data[field]);
        } else {
          setError(true); // Field does not exist
          setData(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(true); // API error or other issues
        setData(false);
      }
    };

    fetchUserField();
  }, [field]);

  return data;
};
