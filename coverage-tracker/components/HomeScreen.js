import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'

import DormLocations from './DormLocations'

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper'


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
  const[userInfo, setUserInfo] = useState({});
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
    
  }, [])

  const signout = () => {
    firebase.auth().signOut().then(() => {
        props.navigation.navigate('Login', {
            navigation: props.navigation,
        })
    }).catch((error) =>  {
        alert('An error occurred that prevented Sign Out from occuring')
    })
  }

  return (
    <View style={styles.absoluteFill}>
        <View style={styles.infoBar}>
          { userInfo.staffer_type != null ? 
            <View style={styles.textBar}>
              <Text style={styles.textBarText}>{userInfo.name} - {userInfo.staffer_type}</Text>
              <Text style={styles.textBarText}>{userInfo.on_coverage ? 'On Coverage' : 'Not on Coverage' }</Text>
            </View>
            : <Text></Text>
          }
          <View style={styles.buttonBar}>
            { userInfo.staffer_type != null ? 
              <TouchableOpacity 
              adjustFontSizeToFit
              numberOfLines={1}
              style={styles.button}
              >
                <Text>{userInfo.building} page</Text> 
              </TouchableOpacity> 
              : <Text></Text>
            }
            <TouchableOpacity 
            style={styles.button}
            onPress={() => signout()}
            >
              <Text>Sign Out</Text> 
            </TouchableOpacity>         
          </View>
        </View>
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
  infoBar: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    marginTop: Constants.statusBarHeight,
    marginBottom: Dimensions.get('window').height - (Constants.statusBarHeight + 65),
  },
  textBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBar: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textBarText: {
    fontWeight: 'bold',
  },
  mapMargin: {
    borderWidth: 5,
    borderColor: 'black',
    marginTop: 100,
    marginLeft: 1,
    marginRight: 1,
  }, 
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto', 
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 25,
  },
});
