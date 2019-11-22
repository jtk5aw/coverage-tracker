import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper'

import KeyboardShift from './KeyboardShift'


export default function Login(props) {
    const [email, setEmail] = useState('Enter your email');
    const [password, setPassword] = useState('Enter your password')
    const [blockText, setBlockText] = useState(false)

    const signup = (email, password) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.toString(error))
        }
    }

    const signin = (email, password) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
            props.navigation.navigate('Home', {
                navigation: props.navigation
            })
        } catch(error) {
            alert('That email/password combination does not exist')
        }
    }

    return (
        <KeyboardShift>
            {() => (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.titleText}>Coverage Tracker</Text>
                    <Image source={require('../assets/life-insurance.png')} style={styles.logo}/>
                </View>
                <Text style={styles.textDesc}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={email => setEmail(email)}
                    onFocus={email => setEmail('')}
                    value={email} />
                <Text style={styles.textDesc}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={blockText}
                    onChangeText={password => setPassword(password)}
                    onFocus={password => { 
                        setBlockText(true)
                        setPassword('')
                    }}
                    value={password} />
                <TouchableOpacity
                    style={styles.button}>
                    <Text>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signup(email, password)}>
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
    textDesc: {
        marginLeft: 20, 
        marginRight: 20,
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
