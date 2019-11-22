import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from './FirebaseWrapper.js'

import HomeScreen from './components/HomeScreen'


export default function App() {
  // Setting up the database
  var database = firebase.database()
  this.ref = database.ref('default')
  const dbh = firebase.firestore();
  const dormLocationsRef = dbh.collection('dorm-locations')

  return (
    <HomeScreen />
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
