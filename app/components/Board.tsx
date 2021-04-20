import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
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
import { TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

export default function Board({ navigation }: any) {
  const { user, signout } = useAuth();
  const [dataList, setDataList] = useState<any>([]);

  const [menuHidden, setMenuHidden] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const logout = async (): Promise<void> => {
    setLoggingOut(true);
    const user = await signout();
  };

  const addBoard = async () => {
    const token = await user.getIdToken();
    const url = 'http://localhost:5000/board';

    const data = {
      title: '',
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

  const shareBoard = async (board_id: string) => {
    const token = await user.getIdToken();
    const url = 'http://localhost:5000/board';

    const data = {
      user_email: '',
      board_id: board_id,
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
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = await user.getIdToken();
      console.log('Starting');
      const res: any = await fetch('http://localhost:5000/boards', {
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

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Module', { boardId: item._id })}
      >
        <Div
          w={150}
          p={5}
          alignItems='center'
          justifyContent='center'
          bg='white'
          shadow='md'
          m={10}
          rounded='lg'
          h={150}
        >
          <Div ml={5}>
            <Text
              style={{ fontFamily: 'Avenir' }}
              color='gray900'
              fontWeight='bold'
            >
              {item.title}
            </Text>
          </Div>
        </Div>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, marginTop: 0, top: 0 }}>
        <Header
          mb={0}
          p='sm'
          borderBottomWidth={1}
          borderBottomColor='gray200'
          alignment='center'
          shadow='none'
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
            Boards
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

        <Div flex={1} m={20} w={width - 20} alignItems='center'>
          {dataList && (
            <FlatList
              data={dataList}
              contentContainerStyle={{ alignContent: 'center' }}
              //   @ts-ignore
              renderItem={_renderItem}
              keyExtractor={(item) => item._id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Div>
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
});
