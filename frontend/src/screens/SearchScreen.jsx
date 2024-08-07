import React, {useEffect, useState} from "react";
import {View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { fetchSearchData } from "../services/api";

/*
const SearchScreen = () => {
    const [data, setData] = useState({
        popular_searches: [],
        articles: [],
        videos: [],
        podcasts: []
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const searchData = await fetchSearchData();
                setData(searchData);
            }
            catch(error) {
                console.error('Failed to fetch data', error)
            }
        };
        getData();
    }, []);

    return (
        <Text>Popular Searches</Text>
    )
}
*/


const SearchScreen = () => {
    return (
      <View>
        <Text>Search Screen</Text>
      </View>
    );
  };