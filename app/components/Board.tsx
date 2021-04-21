import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Alert } from 'react-native';
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
  Icon,
} from 'react-native-magnus';
import { useAuth } from '../hooks/use-auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

export default function Board({ navigation }: any) {
  const { user, signout } = useAuth();
  const [dataList, setDataList] = useState<any>([]);

  const [menuHidden, setMenuHidden] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const shareRef = useRef<any>(null);

  const logout = async (): Promise<void> => {
    setLoggingOut(true);
    const user = await signout();
  };

  const addBoard = async () => {
    setLoading(true);
    const token = await user.getIdToken();
    const url = 'http://localhost:5000/board';

    const data = {
      title: title,
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
      .catch((err) => {
        Alert.alert(err.toString(), '', [{ text: 'Ok' }]);
        console.error(err);
        setLoading(false);
        return;
      });

    if (res.content) {
      const newList = [...dataList, res.content];
      setDataList(newList);
    }

    setLoading(false);
    setTitle('');
    shareRef.current.snapTo(1);
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

  const renderBoard = () => (
    <Div h={300} alignSelf='center' bg='#F3F4F6'>
      <Text
        color='gray900'
        mx='xl'
        mt='xl'
        fontSize={14}
        style={{ fontFamily: 'Avenir' }}
      >
        Board Name
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
        placeholder='Your Board Name'
        style={{ fontFamily: 'Avenir' }}
        onChangeText={setTitle}
        value={title}
      />
      <Button
        bg='blue500'
        block
        mx='xl'
        mt='sm'
        disabled={title.trim() === ''}
        loading={loading}
        onPress={addBoard}
      >
        <Text
          fontSize='lg'
          fontWeight='bold'
          style={{ fontFamily: 'Avenir' }}
          color='white'
        >
          Add Board
        </Text>
      </Button>
    </Div>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
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
        renderContent={renderBoard}
      />
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

        <Fab
          bg='blue500'
          h={50}
          w={50}
          icon={<AntDesign name='plus' size={15} color='white' />}
          activeIcon={<AntDesign name='close' size={15} color='white' />}
        >
          <Button
            p='none'
            bg='transparent'
            justifyContent='flex-end'
            onPress={() => shareRef.current.snapTo(0)}
          >
            <Div rounded='sm' bg='white' p='sm'>
              <Text fontSize='md'>Add Board</Text>
            </Div>
            <Icon
              name='addfolder'
              fontFamily='AntDesign'
              color='blue500'
              fontSize={20}
              h={50}
              w={50}
              rounded='circle'
              ml='md'
              bg='white'
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
