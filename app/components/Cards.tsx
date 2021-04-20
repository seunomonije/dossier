import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Div, Image, Text } from 'react-native-magnus';
import * as WebBrowser from 'expo-web-browser';

export default function Cards({ list }: any) {
  const width: number = Dimensions.get('window').width - 50;
  const [result, setResult] = useState<WebBrowser.WebBrowserResult>();

  const _handlePressButtonAsync = async (url: string) => {
    let result = await WebBrowser.openBrowserAsync(url.toString());
    setResult(result);
  };

  const gridList = list.map((obj: any, idx: number) => {
    if (obj.image !== null) {
      return (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            _handlePressButtonAsync(obj.url);
          }}
          style={{ flex: 2 }}
        >
          <Div
            flexDir='row'
            flexWrap='wrap'
            w={width}
            h={150}
            p={5}
            m={5}
            alignItems='center'
            justifyContent='space-evenly'
            borderColor='gray900'
            bg='white'
            shadow='md'
            rounded='lg'
          >
            <Image
              resizeMode='cover'
              h={100}
              w={100}
              rounded='md'
              source={{
                uri: obj.image.toString(),
              }}
            />
            <Div h={140} w={width - 130} justifyContent='center' p={5}>
              <Text
                style={{ fontFamily: 'Avenir' }}
                color='gray900'
                fontWeight='bold'
              >
                {obj.title}
              </Text>
              <Text numberOfLines={5} style={{ fontFamily: 'Avenir' }}>
                {obj.text}
              </Text>
            </Div>
          </Div>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            _handlePressButtonAsync(obj.url);
          }}
          style={{ flex: 1, width: (width - 40) / 2 }}
        >
          <Div
            flexDir='row'
            w={(width - 40) / 2}
            p={5}
            alignItems='center'
            justifyContent='center'
            bg='white'
            shadow='md'
            m={5}
            rounded='lg'
            h={150}
          >
            <Div ml={5}>
              <Text
                style={{ fontFamily: 'Avenir' }}
                color='gray900'
                fontWeight='bold'
              >
                {obj.title}
              </Text>
              <Text style={{ fontFamily: 'Avenir' }}>{obj.text}</Text>
            </Div>
          </Div>
        </TouchableOpacity>
      );
    }
  });

  return (
    <Div flex={1} flexWrap='wrap' m={20}>
      <ScrollView style={{ padding: 0, margin: 0 }}>
        <View style={{ flex: 1 }}>{gridList}</View>
      </ScrollView>
    </Div>
  );
}
