import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper'



export default function SendVerification(props) {

    const sendVerification = (email, password) => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                data.user.sendEmailVerification()
                .then(() => props.navigation.navigate('Login', {
                    navigation: props.navigation
                }))
            })
            .catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.textThanks, styles.textAlignCenter]}>Thank you for creating an account with Coverage Tracker! </Text>
            <View>
                <Text style={[styles.textInstructions, styles.textAlignLeft]}>Please click the button below to send a verification email. Follow the instructions in that email in order to finish setting up your account.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => sendVerification(props.navigation.state.params.email, props.navigation.state.params.password)}>
                    <Text>Send Email verification</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight,
    },
    textThanks: {
        fontSize: 20,
        padding: 20, 
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    textInstructions: {
        fontSize: 13,
        padding: 20,
    },
    textAlignLeft: {
        textAlign: 'left',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
  });
