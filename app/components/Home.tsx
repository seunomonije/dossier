import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Fab,
  Text,
  Div,
  Button,
  Header,
  Avatar,
  Input,
  Overlay,
  Image,
} from 'react-native-magnus';
import { useAuth } from '../hooks/use-auth';
import Cards from './Cards';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const width = Dimensions.get('window').width;

export default function Home({ navigation, route }: any) {
  const { user, signout } = useAuth();
  const [dataList, setDataList] = useState<any>([]);

  const [menuHidden, setMenuHidden] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const shareRef = useRef<BottomSheet>();
  const moduleRef = useRef<BottomSheet>();

  const logout = async (): Promise<void> => {
    setLoggingOut(true);
    const user = await signout();
  };

  const addContent = async () => {
    const token = await user.getIdToken();
    const url = 'http://localhost:5000/content';

    const data = {
      url: '',
      board_id: route.params.boardId,
    };

    const res: any = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    const newList = [...dataList, res.content];
    setDataList(newList);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = await user.getIdToken();
      const url = 'http://localhost:5000/content/' + route.params.boardId;

      const res: any = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        },
        method: 'GET',
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setDataList(res.content);
    };

    fetchData();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderShare = () => (
    <Div h={300} alignSelf='center' bg='#F3F4F6'>
      <Text
        color='gray900'
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
      />
      <Button bg='blue500' block mx='xl' mt='sm'>
        <Text
          fontSize='lg'
          fontWeight='bold'
          style={{ fontFamily: 'Avenir' }}
          color='white'
        >
          Share
        </Text>
      </Button>
    </Div>
  );

  const renderModule = () => (
    <Div h={300} alignSelf='center' bg='#F3F4F6'>
      <Text
        color='gray900'
        mx='xl'
        mt='xl'
        fontSize={14}
        style={{ fontFamily: 'Avenir' }}
      >
        Link
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
        placeholder='https://google.com'
        style={{ fontFamily: 'Avenir' }}
      />
      <Button bg='blue500' block mx='xl' mt='sm'>
        <Text
          fontSize='lg'
          fontWeight='bold'
          style={{ fontFamily: 'Avenir' }}
          color='white'
        >
          Add Module
        </Text>
      </Button>
    </Div>
  );

  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={shareRef}
        snapPoints={[330, 0]}
        initialSnap={1}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledGestureInteraction={true}
        renderContent={renderShare}
      />
      <BottomSheet
        ref={moduleRef}
        snapPoints={[330, 0]}
        initialSnap={1}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledGestureInteraction={true}
        renderContent={renderModule}
      />
      <SafeAreaView style={{ flex: 1, marginTop: 0, top: 0 }}>
        <Header
          mb={0}
          p='sm'
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
          suffix={
            <TouchableOpacity
              style={{
                marginRight: 10,
                marginTop: 0,
                backgroundColor: 'gray100',
              }}
              onPress={() => setMenuHidden(!menuHidden)}
            >
              <Avatar bg='red300' size={32} color='red800'>
                <Image h={15} w={15} source={require('../assets/person.png')} />
              </Avatar>
            </TouchableOpacity>
          }
        >
          <Text
            fontSize={18}
            fontWeight='bold'
            pt='sm'
            style={{ fontFamily: 'Avenir' }}
          >
            Modules
          </Text>
        </Header>
        <Overlay visible={menuHidden} p='xl'>
          <Button
            bg='#F3F4F6'
            loading={loggingOut}
            block
            onPress={async () => {
              setLoggingOut(true);
              await logout();
            }}
          >
            <Div rounded='sm'>
              <Text
                fontSize='lg'
                fontWeight='bold'
                style={{ fontFamily: 'Avenir' }}
              >
                Logout
              </Text>
            </Div>
          </Button>
          <Button
            bg='#FEE2E2'
            block
            mt={10}
            onPress={() => setMenuHidden(!menuHidden)}
          >
            <Div rounded='sm'>
              <Text
                fontSize='lg'
                fontWeight='bold'
                style={{ fontFamily: 'Avenir' }}
              >
                Cancel
              </Text>
            </Div>
          </Button>
        </Overlay>
        {dataList.length === 0 ? (
          <Div
            flex={1}
            flexDir='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text
              style={{ fontFamily: 'Avenir' }}
              fontSize={20}
              fontWeight='bold'
              textAlign='center'
            >
              {' '}
              Oops! Doesn't seem like there's anything here
            </Text>
            <Text
              style={{ fontFamily: 'Avenir' }}
              fontSize={16}
              textAlign='center'
            >
              {' '}
              Add content today!
            </Text>
            <Div w={width - 50} h={300}>
              <LottieView
                source={require('../assets/empty.json')}
                autoPlay
                loop
              />
            </Div>
          </Div>
        ) : (
          <Cards list={dataList} />
        )}
        <Fab bg='blue500' h={50} w={50}>
          <Button
            p='none'
            bg='transparent'
            justifyContent='flex-end'
            onPress={() => moduleRef.current.snapTo(0)}
          >
            <Div rounded='sm' bg='white' p='sm'>
              <Text fontSize='md'>Add Module</Text>
            </Div>
            <Image
              source={require('../assets/module.png')}
              bg='gray200'
              h={50}
              w={50}
              rounded='circle'
              ml='md'
            />
          </Button>
        </Fab>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width,
  },
  header: {
    backgroundColor: '#F3F4F6',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});
