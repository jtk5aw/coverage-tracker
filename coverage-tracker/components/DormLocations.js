import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

export default function DormLocations(props) {
  return (
    props.locations.map(location => {
      return <Marker
        key={location.id}
        coordinate={{
          latitude: location.Latitude,
          longitude: location.Longitude
        }}
        title={location.Name}
        description={location.Name}
      />
    })
  )
}