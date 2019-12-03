import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

export default function StafferCard(props) {

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.textSection}>
          <Text style={[styles.screenText, styles.nameText]}>{props.name} - {props.comp_id}</Text>
          <Text style={styles.screenText}>{props.on_coverage ? 'On Coverage' : ''}</Text>
        </View>
      </View>
      <View style={styles.buttomSection}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Linking.openURL('tel:'+props.phone_number)}>
          <Text
            style={styles.screenText}>
            Call Me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Linking.openURL('sms:'+props.phone_number)}>
          <Text
            style={styles.screenText}>
            Text Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 315,
    height: 133,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderColor: 'black',
    borderWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
  },
  buttonStyle: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  screenText: {
    fontFamily: 'Helvetica',
    fontSize: 14,
  },
  buttomSection: {
    flexDirection: 'row',
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1,
    height: 52,
    width: '100%',
  },
});
