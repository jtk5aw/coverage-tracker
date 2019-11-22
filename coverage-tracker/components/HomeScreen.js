import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'

import DormLocations from './DormLocations'

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper'


// Include this somehow <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// Include this too <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function HomeScreen() {
  // Setting up the database
  var database = firebase.database()
  this.ref = database.ref('default')
  const dbh = firebase.firestore();
  const dormLocationsRef = dbh.collection('dorm-locations')

  // Setting up locations
  const [locations, setLocations] = useState([]); 
  const [currLoc, setCurrLoc] = useState({
    latitude: 38.0336,
    longitude: -78.5080,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  //Hook that fires on onmount and gets current location
  useEffect(() => {
    const getStartLoc = async () => {
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        navigator.geolocation.getCurrentPosition(
          position => {
            const currLocation = position.coords;
            setCurrLoc({
              longitude: currLocation.longitude,
              latitude: currLocation.latitude,
              latitudeDelta: .0001,
              longitudeDelta: .001
            })
          }
        );
      }
      else {
        alert('Right now location is not enabled for this app.');
      }
    }
    getStartLoc()
  }, [])

    useEffect(() => {
      dormLocationsRef.get()
      .then((querySnapshot) => {
        parseObject = querySnapshot.docs.map((doc, index) => {
          data = doc.data()
          return {
            'id': index,
            'Name': doc.id,
            'Latitude': data.Latitude,
            'Longitude': data.Longitude
          }
        })
        setLocations(parseObject)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    
    }, [])

  return (
    <View style={styles.absoluteFill}>
      <MapView 
        style = {[styles.absoluteFill, styles.mapMargin]}
        initialRegion={{
          latitude: 38.0336,
          longitude: -78.5080,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <DormLocations locations={locations}/>
        <Marker
        coordinate={{ // May update if currLoc changes
          latitude: currLoc.latitude, 
          longitude: currLoc.longitude
        }}
        title='You are here'
        description='This is you'
        pinColor='blue'
        >
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  mapMargin: {
    borderWidth: 5,
    borderColor: 'black',
    marginTop: 100,
    marginLeft: 1,
    marginRight: 1,
  }
});
