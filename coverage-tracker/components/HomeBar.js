import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';


export default function HomeBar(props) {
    return (
        <View style={styles.infoBar}>
            { props.userInfo.staffer_type != null ? 
                <View style={styles.textBar}>
                    <Text style={styles.textBarText}>{props.userInfo.name} - {props.userInfo.staffer_type}</Text>
                    <Text style={styles.textBarText}>{props.userInfo.on_coverage ? 'On Coverage' : 'Not on Coverage' }</Text>
                </View>
                : <Text></Text>
            }
            <View style={styles.buttonBar}>
            { props.userInfo.staffer_type != null ? 
                <TouchableOpacity 
                adjustFontSizeToFit
                numberOfLines={1}
                style={styles.button}
                onPress = {() => {
                  props.navigation.navigate('DormPage', {
                    dorm: props.userInfo.building,
                    navigation : props.navigation,
                  })
                }}
                >
                    <Text>{props.userInfo.building} page</Text> 
                </TouchableOpacity> 
                : <Text></Text>
            }
                <TouchableOpacity 
                style={styles.button}
                onPress={() => props.signout()}
                >
                    <Text>Sign Out</Text> 
                </TouchableOpacity>         
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
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