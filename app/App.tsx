import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, Route, Redirect } from "react-router-dom";
import VideoComponent from "./components/VideoComponent"
import { BrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn"
import {HomeScreen} from "./components/HomeScreen";

export default function App() {
  return (
  	<BrowserRouter>
	    <View style={styles.container}>
			<Text style = {styles.alignLeft}>Welcome, Seun</Text>
	      <Switch>
          	<Route path="/home" component={HomeScreen}/>
          	{/*<Route path="/home"component = {videoComponent}/>*/}
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
    backgroundColor: '#adb6c4',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  alignLeft:{
	  textAlign:'left'
  }
});
