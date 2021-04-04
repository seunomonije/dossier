import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import {Board} from "./components/Board";
import {SignUpPage} from "./components/SignUpPage";

export default function App() {
  return (
  	<BrowserRouter>
	    <View style={styles.container}>
			<Text style = {styles.alignLeft}>Welcome, Seun</Text>
	      <Switch>
          	<Route path="/home" component={Board}/>
          	<Redirect to="/signup" />
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
