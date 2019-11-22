import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Google from 'expo-google-app-auth';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from './FirebaseWrapper.js'

import HomeScreen from './components/HomeScreen'
import Login from './components/Login'


export default function App() {
  // Setting up the database
  var database = firebase.database()
  this.ref = database.ref('default')
  const dbh = firebase.firestore();
  const dormLocationsRef = dbh.collection('dorm-locations')

  // // On mount will check for google-login
  // useEffect(() => {
  //   const googleLogin = async () => {
  //     const { type, accessToken, user } = await Google.logInAsync(config);

  //     if (type === 'success') {
  //       // Then you can use the Google REST API
  //       let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       });
  //     }
  //   }
  //   googleLogin()
  // }, [])

  return (
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
