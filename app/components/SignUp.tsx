import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, FlatList } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  Div,
  Text,
  Button,
  Image,
  Header,
  Icon,
  Input,
} from 'react-native-magnus';
import { useAuth } from '../hooks/use-auth';

export default function Signup({ navigation }: any) {
  const { signup } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    const user = await signup(email, password, username);
  };

  return (
    <Div style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle='dark-content' />
      <Header
        mt='2xl'
        p='lg'
        borderBottomWidth={1}
        borderBottomColor='gray200'
        alignment='center'
        shadow='none'
        prefix={
          <Button bg='transparent' onPress={() => navigation.pop()}>
            <Image
              h={20}
              w={20}
              mr='md'
              source={require('../assets/left-arrow.png')}
            />
          </Button>
        }
      >
        Sign Up
      </Header>
      <SafeAreaView style={{ flex: 1 }}>
        <Div flex={1} mt='3xl' px='md'>
          <Div alignItems='center'>
            <Image
              h={150}
              w={150}
              m={10}
              rounded='circle'
              source={require('../assets/celebration.png')}
            />
            <Text
              mt='lg'
              mx='lg'
              w='70%'
              fontWeight='700'
              fontSize='3xl'
              textAlign='center'
              style={{ fontFamily: 'Avenir' }}
            >
              Here's to you joining us!
            </Text>
          </Div>
          <Text
            color='gray600'
            mx='xl'
            mt='md'
            px='md'
            fontSize={14}
            style={{ fontFamily: 'Avenir' }}
          >
            Full Name
          </Text>
          <Input
            mx='xl'
            mt='sm'
            px='md'
            py='sm'
            borderColor='gray200'
            borderWidth={1}
            h={44}
            fontSize={14}
            bg='#F9FAFB'
            focusBorderColor='blue500'
            placeholder='Jane Doe'
            style={{ fontFamily: 'Avenir' }}
            onChangeText={setUserName}
          />
          <Text
            color='gray600'
            mx='xl'
            mt='md'
            px='md'
            fontSize={14}
            style={{ fontFamily: 'Avenir' }}
          >
            Email Address
          </Text>
          <Input
            mx='xl'
            mt='sm'
            px='md'
            py='sm'
            borderColor='gray200'
            borderWidth={1}
            h={44}
            fontSize={14}
            bg='#F9FAFB'
            focusBorderColor='blue500'
            placeholder='you@example.com'
            style={{ fontFamily: 'Avenir' }}
            autoCapitalize='none'
            onChangeText={setEmail}
          />
          <Text
            color='gray600'
            mx='xl'
            mt='md'
            px='md'
            style={{ fontFamily: 'Avenir' }}
          >
            Password
          </Text>
          <Input
            mx='xl'
            mt='sm'
            px='md'
            py='sm'
            borderColor='gray200'
            borderWidth={1}
            secureTextEntry
            bg='#F9FAFB'
            h={44}
            fontSize={14}
            focusBorderColor='blue500'
            placeholder='Password'
            style={{ fontFamily: 'Avenir' }}
            onChangeText={setPassword}
          />
          <Button
            mx='xl'
            my='xl'
            py='lg'
            bg='#1D4ED8'
            h={44}
            block
            loading={false}
            shadow={4}
            shadowColor='gray900'
            onPress={onSubmit}
            disabled={
              email.trim() == '' ||
              password.trim() === '' ||
              username.trim() === ''
            }
          >
            <Text
              fontSize='xl'
              fontWeight='bold'
              color='white'
              letterSpacing={1.5}
              bg='blue500'
              style={{ fontFamily: 'Avenir' }}
            >
              Sign Up
            </Text>
          </Button>
        </Div>
        <KeyboardSpacer />
      </SafeAreaView>
    </Div>
  );
}
