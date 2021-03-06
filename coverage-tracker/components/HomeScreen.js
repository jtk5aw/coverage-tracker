import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Linking } from 'expo';
import { DeviceMotion } from 'expo-sensors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'


import DormLocations from './DormLocations'
import HomeBar from './HomeBar'

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper'
import { RotationGestureHandler } from 'react-native-gesture-handler';


// Include this somehow <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// Include this too <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

var APP = {
  staffers_url: "https://coverage-tracker-webservice.herokuapp.com/staffer/"
}

export default function HomeScreen(props) {
  // Setting up the database
  var database = firebase.database()
  this.ref = database.ref('default')
  const dbh = firebase.firestore();
  const dormLocationsRef = dbh.collection('dorm-locations')

  // Setting up locations
  const[currCompId, setCurrCompId] = useState(firebase.auth().currentUser.email.split('@')[0])
  const[userInfo, setUserInfo] = useState({})
  const[onCoverageInfo, setOnCoverageInfo] = useState({})
  const[dormStaffers, setDormStaffers] = useState([])
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

  useEffect(() => {    
    const fetchData = async () => {
      let response = await fetch(
        APP.staffers_url + 'by_comp_id/' + currCompId + '/'
      );
      let parseObject = await response.json();
      setUserInfo(parseObject)
    }
    fetchData()
    
  }, [currCompId])

  // Get Staffers in your building after userInfo is set
  useEffect(() => {
    const fetchDormData = async() => {
      let response = await fetch(
        APP.staffers_url + 'by_dorm/' + userInfo.building
      )
      let parseObject = await response.json()
      setDormStaffers(filterDormStaffers(parseObject))
    }
    fetchDormData()
  }, [userInfo])

  useEffect(() =>  {
    let staffersOnCoverage = dormStaffers.filter((staffer) => {
      return staffer.on_coverage;
    })
    setOnCoverageInfo(staffersOnCoverage[0])
  }, [dormStaffers])

  useEffect(() => {
    DeviceMotion.addListener((shake) => {
      if(9 < shake.rotationRate.gamma) {
        Alert.alert(
          'Call RA on Coverage',
          onCoverageInfo.name + ' is on coverage.', 
          [
            {text: 'Nevermind'},
            {text: 'Make call', onPress: () => Linking.openURL('tel:'+onCoverageInfo.phone_number)},
          ],
        )
      }
    });
    return () => DeviceMotion.removeAllListeners();
  }, [onCoverageInfo])

  const signout = () => {
    firebase.auth().signOut().then(() => {
        props.navigation.navigate('Login', {
            navigation: props.navigation,
        })
    }).catch((error) =>  {
        alert('An error occurred that prevented Sign Out from occuring')
    })
  }

  const filterDormStaffers = (parseObject) => {
    return parseObject.map((staffer, index) => {
      staffer.id = index
      return staffer
    }).filter((staffer) => {
      return staffer.comp_id != currCompId
    })
  }

  return (
    <View style={styles.absoluteFill}>
      <HomeBar 
      userInfo={userInfo} 
      dormStaffers={dormStaffers}
      signout={signout} 
      navigation={props.navigation}
      />
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
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  mapMargin: {
    borderWidth: 5,
    borderColor: 'black',
    marginTop: 100,
    marginLeft: 1,
    marginRight: 1,
  }, 
});
