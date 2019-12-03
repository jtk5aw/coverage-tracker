import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper'


export default function DormPage(props) {
  // Setting up the database
  var database = firebase.database()
  this.ref = database.ref('default')
  const dbh = firebase.firestore();
  const dormLocationsRef = dbh.collection('dorm-locations')

  return (
    <View style={styles.container}>
        <TouchableOpacity 
        style={styles.button}
        onPress = {() => props.navigation.goBack()}>
            <Text>Go Back</Text>
        </TouchableOpacity>
      <Text style={styles.textTitle}>On {props.navigation.getParam('dorm', '')} page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        marginTop: Constants.statusBarHeight,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%', 
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#DDDDDD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        height: 25,
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
