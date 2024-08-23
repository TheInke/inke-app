import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility


<Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text>This is your modal content!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalButton}>Done</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>