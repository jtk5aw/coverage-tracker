import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import KeyboardShift from './KeyboardShift'


export default function Login() {
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Password');

  return (
    <KeyboardShift>
        {() => (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.titleText}>Coverage Tracker</Text>
                <Image source={require('../assets/life-insurance.png')} style={styles.logo}/>
            </View>
            <TextInput
                style={styles.textInput}
                onChangeText={email => setEmail(email)}
                onFocus={(email) => setEmail('')}
                value={email} />
            <TextInput
                style={styles.textInput}
                onChangeText={password => setPassword(password)}
                onFocus={(password) => setPassword('')}
                value={password} />
            <TouchableOpacity
                style={styles.button}>
                <Text>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
        )}
    </KeyboardShift>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight,
    },
    center: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        paddingTop: 20,
        fontSize: 20, 
        fontWeight: 'bold',
    },
    logo: {
        flex: 1, 
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height / 2,
    },
    textInput: {
        height: 40, 
        borderColor: 'gray',
        marginLeft: 20, 
        marginRight: 20,
        marginBottom: 10,
        borderWidth: 1
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
    },
  });
