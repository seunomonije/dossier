import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, Route, Redirect } from "react-router-dom";
import VideoComponent from "./components/VideoComponent"
import { BrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn"

export default function App() {
  return (
  	<BrowserRouter>
	    <View style={styles.container}>
	      <Switch>
          	<Route path="/home" component={VideoComponent} />
          	<Route path="/signin" component={SignIn} />
          	<Redirect to="/home" />
       	</Switch>

	    </View>
	</BrowserRouter>
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
