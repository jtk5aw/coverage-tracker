import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

import DormLocations from './components/DormLocations'


export default function App() {
  // Setting up locations
  const [locations, setLocations] = useState([]); 

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
