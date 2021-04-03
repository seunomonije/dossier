import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//material UI component imports
import VideoComponent from "./components/VideoComponent"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>aTEST open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <VideoComponent/>
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
