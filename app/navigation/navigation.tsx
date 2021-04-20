import React from 'react';
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import { UseProvideAuth, useAuth } from '../hooks/use-auth';

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

// Create the root stack
const RootStack = createStackNavigator();
export const RootStackScreen = () => {
  const { user } = useAuth();

  return (
    <RootStack.Navigator headerMode='none'>
      {user ? (
        <RootStack.Screen
          name='App'
          component={Home}
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
