import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'

import DormLocations from './components/DormLocations'


// Include this somehow <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
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
      console.log(status)
      if (status === 'granted') {
        console.log('in if')
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
        alert('Rigt now location is not enabled for this app.');
      }
    }
    getStartLoc()
  }, [])

  //Hook The fires on onmount and gets data 
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "https://api.devhub.virginia.edu/v1/facilities/categories/housing"
      );
      let parseObject = await response.json();
      setLocations(assignIDs(parseObject))
    }
    fetchData()
  }, []);

  function assignIDs(locations){
    // ONly keeps locationsn with valid locations
    return locations.map((location, index)=>{
      location.id = index
      return location
    }).filter(location => location.Latitude && location.Longitude)
  }

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
        >
          <Image source={require('./assets/circle-shape-outline.png')} style={{height: 15, width:15 }} />
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
