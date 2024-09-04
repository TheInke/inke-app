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
    SocialCircles: [
        { id: 1, name: 'Mentally Well', image: 'path/to/image1' },
        { id: 2, name: 'Songwriters', image: 'path/to/image2' },
        { id: 3, name: 'Artists', image: 'path/to/image3' },
        { id: 4, name: 'Writers', image: 'path/to/image4' },
        { id: 5, name: 'Photographers', image: 'path/to/image5' },
        { id: 6, name: 'Travelers', image: 'path/to/image6' },
        { id: 7, name: 'Gamers', image: 'path/to/image7' },
        { id: 8, name: 'Coders', image: 'path/to/image8' },
        { id: 9, name: 'Entrepreneurs', image: 'path/to/image9' },
    ],
};

const ConnectionsPage = ({ navigation }) => {
    const [connections, setConnections] = useState([]);
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchConnections();
    }, [selectedTab]);

    const fetchConnections = async () => {
        try {
            const response = await fetch(`${API_URL}/connections?status=${selectedTab.toLowerCase()}`, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setConnections(data);
            } else {
                console.warn('Failed to fetch data from API. Using dummy data instead.');
                const dummyData = dummyConnections[selectedTab] || [];
                setConnections(dummyData);
            }
        } catch (error) {
            console.error('Error fetching connections from API:', error);
            const dummyData = dummyConnections[selectedTab] || [];
            setConnections(dummyData);
        }
    };

    const handleRemove = async (connectionId) => {
        try {
            await fetch(`${API_URL}/connections/${connectionId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(`Removed connection with ID: ${connectionId}`);
            fetchConnections();
        } catch (error) {
            console.error('Error removing connection:', error);
        }
    };

    const handleAccept = async (connectionId) => {
        try {
            await fetch(`${API_URL}/connections/${connectionId}/accept`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(`Accepted connection with ID: ${connectionId}`);
            fetchConnections();
        } catch (error) {
            console.error('Error accepting connection:', error);
        }
    };

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

    const renderSocialCircleItem = ({ item }) => (
        <TouchableOpacity
            style={styles.socialCircle}
            onPress={() => navigation.navigate('SocialCircleScreen', { circleName: item.name })}
        >
            <View style={styles.socialCircleImage} />
            <Text style={styles.socialCircleText}>{item.name}</Text>
        </TouchableOpacity>
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
                {['All', 'Pending', 'Sent', 'SocialCircles'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, selectedTab === tab && styles.activeTab]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedTab === 'SocialCircles' ? (
                <FlatList
                    data={dummyConnections.SocialCircles}
                    renderItem={renderSocialCircleItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    key={selectedTab}
                />
            ) : (
                <FlatList
                    data={connections.filter(connection =>
                        connection.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                    renderItem={renderConnectionItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    key={selectedTab}
                />
            )}
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
    socialCircle: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
    },
    socialCircleImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd', // Placeholder color; replace with image source
    },
    socialCircleText: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ConnectionsPage;
