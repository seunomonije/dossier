import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, Div } from 'react-native-magnus';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Board from './components/Board';
import { createStackNavigator } from '@react-navigation/stack';
import { UseProvideAuth, useAuth } from './hooks/use-auth';
import * as Font from 'expo-font';
// import { RootStackScreen } from './navigation/navigation';

const theme = {
  colors: {
    blue500: '#1D4ED8',
  },
};

// Create the Auth Stack
const AuthStack = createStackNavigator();
const AuthStackScreen = (): React.ReactElement => (
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen
      name='Login'
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='SignUp'
      component={SignUp}
      options={{ title: 'Create Account' }}
    />
  </AuthStack.Navigator>
);

// Create Main Stack
const MainStack = createStackNavigator();
const MainStackScreen = (): React.ReactElement => (
  <MainStack.Navigator headerMode='none'>
    <MainStack.Screen
      name='Board'
      component={Board}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name='Module'
      component={Home}
      options={{ title: 'Module' }}
    />
  </MainStack.Navigator>
);

// Create the root stack
const RootStack = createStackNavigator();
export const RootStackScreen = () => {
  const { user } = useAuth();

  return (
    <RootStack.Navigator headerMode='none'>
      {user ? (
        <RootStack.Screen
          name='App'
          component={MainStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name='Auth'
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => (
  <UseProvideAuth>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </ThemeProvider>
  </UseProvideAuth>
);
