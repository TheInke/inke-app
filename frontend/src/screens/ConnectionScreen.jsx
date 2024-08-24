import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const API_URL = 'https://your-backend-api.com'; // Replace with your backend API URL
const ACCESS_TOKEN = 'your-access-token'; // Replace with your actual access token

const dummyConnections = {
    All: [
        { id: 1, name: 'Oscar' },
        { id: 2, name: 'Daniel' },
        { id: 3, name: 'Catherine' },
        { id: 4, name: 'Emily' },
        { id: 5, name: 'James' },
        { id: 6, name: 'Henry' },
        { id: 7, name: 'Alice' },
        { id: 8, name: 'Bob' },
    ],
    Pending: [
        { id: 9, name: 'Catherine' },
        { id: 10, name: 'Emily' },
        { id: 11, name: 'James' },
    ],
    Sent: [
        { id: 12, name: 'Alice' },
        { id: 13, name: 'Bob' },
    ],
};

const ConnectionsPage = () => {
    const [connections, setConnections] = useState([]);
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchConnections();
    }, [selectedTab]);

    const fetchConnections = async () => {
        try {
            // For now, using dummy data for testing
            const dummyData = dummyConnections[selectedTab] || [];
            setConnections(dummyData);

            // Uncomment below code for actual API fetching
            // const response = await fetch(`${API_URL}/connections?status=${selectedTab.toLowerCase()}`, {
            //     headers: {
            //         'Authorization': `Bearer ${ACCESS_TOKEN}`,
            //         'Content-Type': 'application/json',
            //     },
            // });
            // const data = await response.json();
            // setConnections(data);
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    };

    const handleRemove = async (connectionId) => {
        try {
            // API call to remove connection
            // await fetch(`${API_URL}/connections/${connectionId}/delete`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Authorization': `Bearer ${ACCESS_TOKEN}`,
            //         'Content-Type': 'application/json',
            //     },
            // });

            // For testing, simply log the action
            console.log(`Removed connection with ID: ${connectionId}`);
            fetchConnections();
        } catch (error) {
            console.error('Error removing connection:', error);
        }
    };

    const handleAccept = async (connectionId) => {
        try {
            // API call to accept connection
            // await fetch(`${API_URL}/connections/${connectionId}/accept`, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Bearer ${ACCESS_TOKEN}`,
            //         'Content-Type': 'application/json',
            //     },
            // });

            // For testing, simply log the action
            console.log(`Accepted connection with ID: ${connectionId}`);
            fetchConnections();
        } catch (error) {
            console.error('Error accepting connection:', error);
        }
    };

    const filteredConnections = connections.filter(connection =>
        connection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderConnectionItem = ({ item }) => (
        <View style={styles.connectionItem}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.name}>{item.name}</Text>
            {selectedTab === 'All' && (
                <View style={styles.allActions}>
                    <View style={styles.connectedBox}>
                        <Text style={styles.connectedText}>Connected</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemove(item.id)}
                    >
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            )}
            {selectedTab === 'Pending' && (
                <View style={styles.pendingActions}>
                    <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => handleAccept(item.id)}
                    >
                        <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemove(item.id)}
                    >
                        <Text style={styles.removeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
            {selectedTab === 'Sent' && (
                <View style={styles.sentActions}>
                    <View style={styles.pendingBox}>
                        <Text style={styles.pendingText}>Pending</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemove(item.id)}
                    >
                        <Text style={styles.removeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name or username"
                    placeholderTextColor="#ccc"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <FontAwesome name="search" size={20} color="#000" style={styles.searchIcon} />
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'All' && styles.activeTab]}
                    onPress={() => setSelectedTab('All')}
                >
                    <Text style={[styles.tabText, selectedTab === 'All' && styles.activeTabText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Pending' && styles.activeTab]}
                    onPress={() => setSelectedTab('Pending')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Pending' && styles.activeTabText]}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Sent' && styles.activeTab]}
                    onPress={() => setSelectedTab('Sent')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Sent' && styles.activeTabText]}>Sent</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredConnections}
                renderItem={renderConnectionItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    searchIcon: {
        marginLeft: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    activeTab: {
        backgroundColor: '#000',
    },
    activeTabText: {
        color: '#fff',
    },
    list: {
        marginTop: 10,
    },
    connectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        marginRight: 15,
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    allActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    connectedBox: {
        backgroundColor: '#000',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    connectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pendingActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    acceptButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sentActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pendingBox: {
        backgroundColor: '#000',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    pendingText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#f44336',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ConnectionsPage;
