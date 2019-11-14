import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

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
      console.log(locations[0])
    }
    fetchData()
  }, []);

  function assignIDs(locations){
    // ONly keeps locationsn with valid locations
    return locations.map((location, index)=>{
      location.id = index
      return location
    }).filter(location => location.Latitude && location .Longitude)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          locations.map((location) => {
            return <Text key={location.id}>Name: {location.Name} Lat: {location.Latitude} Long: {location.Longitude}</Text>
          })
        }
      </ScrollView>
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
});
