import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Board } from './components/Board';
import { SignUpPage } from './components/SignUpPage';
import { SignInPage } from './components/SignInPage';
import { PrivateRoute } from './components/PrivateRoute';
import { ProvideAuth } from './hooks/use-auth';

export default function App() {
  return (
    // @ts-ignore
    <BrowserRouter>
      <View style={styles.container}>
        <ProvideAuth>
          <Text></Text>
          <Switch>
            <PrivateRoute path='/home' component={Board} exact />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signin' component={SignInPage} />
            <Route
              path='/'
              component={() => <Redirect to='/home'></Redirect>}
            />
          </Switch>
        </ProvideAuth>
      </View>
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  alignLeft: {
    textAlign: 'left',
  },
});
