import * as React from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import StafferCard from './StafferCard';

export default function CarouselView(props) {
  let deviceWidth = Dimensions.get('window').width;

  function renderItem({ item, index }) {
    return (
      <StafferCard
        id={item.id}
        comp_id={item.comp_id}
        name={item.name}
        on_coverage={item.on_coverage}
        phone_number={item.phone_number}
      />
    );
  }

  if(props.dormStaffers.length > 0){
    return (
      <View style={styles.container}>
        <Carousel
          data={props.dormStaffers}
          renderItem={renderItem}
          sliderHeight={200}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth * .9}
          useScrollView
          />
      </View>
    );
  }
  {console.log('badbadbad')}
  return(<View/>)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 170,
    paddingTop: 15,
  },
});
