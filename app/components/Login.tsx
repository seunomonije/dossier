import React, { useRef, useState } from 'react';
// @ts-ignore
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { StatusBar } from 'react-native';
import { SafeAreaView, ScrollView, View, Alert } from 'react-native';
import { Div, Text, Button, Image, Input } from 'react-native-magnus';
import { useAuth } from '../hooks/use-auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const snackbarRef = React.createRef<any>();

export default function Login({ navigation }: any) {
  const scrollViewRef = useRef<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signin } = useAuth();

  const onSubmit = async () => {
    setLoading(true);
    const user = await signin(email, password).catch((err: any) => {
      setLoading(false);
      Alert.alert(err.toString(), '', [{ text: 'Ok' }]);
    });
  };

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: 'center',
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: 'white',
        }}
      >
        <ScrollView
          style={{ flexGrow: 1 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View>
            <Div alignItems='center'>
              <Image
                h={100}
                w={100}
                m={10}
                rounded='circle'
                source={require('../assets/popular.png')}
              />
              <Text
                mt='sm'
                mx='lg'
                w='70%'
                fontWeight='700'
                fontSize='3xl'
                textAlign='center'
                style={{ fontFamily: 'Avenir' }}
              >
                Organise your online activity
              </Text>
              <Text
                mx='xl'
                fontSize='md'
                color='gray700'
                mt='md'
                w='60%'
                textAlign='center'
                style={{ fontFamily: 'Avenir' }}
              >
                Let's store and track interesting content for your convenience
              </Text>
            </Div>
            <View>
              <Text
                color='gray600'
                mx='xl'
                mt='xl'
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
                autoCapitalize='none'
                borderWidth={1}
                h={44}
                fontSize={14}
                bg='#F9FAFB'
                focusBorderColor='blue500'
                placeholder='you@example.com'
                style={{ fontFamily: 'Avenir' }}
                onChangeText={setEmail}
              />
              <Text
                color='gray600'
                mx='xl'
                mt='md'
                style={{ fontFamily: 'Avenir' }}
              >
                Password
              </Text>
              <Input
                mx='xl'
                mt='md'
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
              <Text
                mt='md'
                fontSize='md'
                color='#1D4ED8'
                mx='xl'
                my='xl'
                textAlign='left'
                fontWeight='bold'
                style={{ fontFamily: 'Avenir' }}
              >
                Forgot Password?
              </Text>
              <Button
                mx='xl'
                mb='sm'
                py='md'
                bg='blue500'
                h={44}
                block
                loading={loading}
                shadowColor='gray900'
                onPress={onSubmit}
                disabled={email.trim() == '' || password.trim() === ''}
              >
                <Text
                  fontSize='xl'
                  fontWeight='bold'
                  color='white'
                  letterSpacing={1.5}
                  style={{ fontFamily: 'Avenir' }}
                >
                  Login
                </Text>
              </Button>
            </View>
            <TouchableOpacity onPress={() => navigation.push('SignUp')}>
              <Text
                mt='sm'
                fontSize='lg'
                color='gray700'
                mx='xl'
                textAlign='center'
                fontWeight='bold'
                style={{ fontFamily: 'Avenir' }}
              >
                Don't have an account? Sign Up!
              </Text>
            </TouchableOpacity>
            <Div
              mx='xl'
              alignItems='center'
              justifyContent='center'
              flexDir='row'
              mt='xl'
            >
              <Div h={1} flex={1} bg='gray200' />
              <Text
                px='lg'
                fontSize='sm'
                color='gray500'
                style={{ fontFamily: 'Avenir' }}
              >
                Or Continue with
              </Text>
              <Div h={1} flex={1} bg='gray200' />
            </Div>
            <Div
              mx='xl'
              alignItems='center'
              justifyContent='center'
              flexDir='row'
              mt='xl'
            >
              <Button
                mr='md'
                flex={1}
                py='lg'
                borderWidth={1}
                borderColor='gray200'
                bg='white'
                color='gray900'
                prefix={
                  <Image
                    h={20}
                    w={20}
                    mr='md'
                    source={require('../assets/google.png')}
                  />
                }
              >
                <Text style={{ fontFamily: 'Avenir' }}>Google</Text>
              </Button>
              <Button
                ml='md'
                flex={1}
                py='lg'
                borderWidth={1}
                borderColor='gray200'
                bg='white'
                shadow='lg'
                color='gray900'
                prefix={
                  <Image
                    h={20}
                    w={20}
                    mr='md'
                    source={require('../assets/facebook.png')}
                  />
                }
              >
                <Text style={{ fontFamily: 'Avenir' }}>Facebook</Text>
              </Button>
            </Div>
            <KeyboardSpacer />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
