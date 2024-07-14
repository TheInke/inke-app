import { View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { signup } from '../services/api';

const SignupScreen = ({ data }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');



    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <text style={style.header} >Registration</text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}/>

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}/>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                secureTextEntry={true}/>

            <TextInput
                placeholder="Phone Number"
                value={number}
                onChangeText={setNumber}
                secureTextEntry={true}/>

            <Button title="Sign Up" />
        </View>
    );
};

export default SignupScreen;