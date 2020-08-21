import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main(){
  const [currentRegion, setCurrentRegion] = useState(null);
  
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }
    
    loadInitialPosition();
  }, []);
  
  if (!currentRegion) {
    return null;
  }
  
  return(
    <MapView style={styles.map} initialRegion={currentRegion}>
      <Marker coordinate={{ latitude: -22.600423, longitude: -46.0562062 }} >
        <Image style={styles.avatar} source={{ uri: 'https://pps.whatsapp.net/v/t61.24694-24/70509664_2621433054641823_517306485738103376_n.jpg?oe=5E2A7BF2&oh=d21486b77a5b84bd1c1b60d0dde1df84' }} />

        <Callout>
          <View style={styles.callout}>
            <Text style={styles.devName}>Mateus Lambert</Text>
            <Text style={styles.devBio}>Cara mais chato que existe</Text>
            <Text style={styles.devTechs}>Truco, Namorar, Filosofar</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  }
});

export default Main;