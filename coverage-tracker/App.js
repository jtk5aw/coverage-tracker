import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from './FirebaseWrapper.js'

import HomeScreen from './components/HomeScreen'
import Login from './components/Login'
import SendVerification from './components/SendVerification'
import DormPage from './components/DormPage'


const screens = {
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen:  Login
  },
  SendVerification: {
    screen: SendVerification
  }, 
  DormPage: {
    screen: DormPage
  }
}

const navConfig = {
  headerMode: 'none',
  initialRouteName: 'Login'
}

const MainNavigator = createStackNavigator(screens, navConfig);
const AppContainer = createAppContainer(MainNavigator)


export default function App() {
  return (
    <AppContainer />
  );
}
