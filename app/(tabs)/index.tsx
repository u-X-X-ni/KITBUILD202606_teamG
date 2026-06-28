//カレンダー画面（トップ画面）

import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
//import { YStack } from 'tamagui';

const  App  =  ( )  =>  { 
  const  [ selected ,  setSelected ]  =  useState ( '' ) ; 
  // 日本時間で現在の日付を取得
  const now = new Date();
  const japanTime = now.getTime() + (9 * 60 * 60 * 1000); // UTC+9の調整
  const today = new Date(japanTime);
  const currentDate = today.toISOString().slice(0, 10); // YYYY-MM-DD形式
  // 日付フォーマット関数
  /*const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
  };*/

  return  ( 
    //<YStack marginTop={80} marginRight={7} marginLeft={7}>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fbf3e8',
      }}
    >
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
        }}
      >まいらいふ</Text>
      < Calendar 
        //ユーザーが押した日付
        onDayPress = { day  =>  { 
          setSelected ( day.dateString ) ; 
          data_num: String;
          router.push({pathname:'/day/date', params:{selected: day.dateString}});
          //console.log ( 'selected day', day ) ;
        } } 
        // 選んだ日付をマーク
        markedDates = { { 
          [ selected ] : { selected : true ,  disableTouchEvent : true  } 
        } } 
        // カレンダーの外観をカスタマイズ
        style = { { 
          /*borderWidth : 1 , 
          borderColor : 'gray' , */
          backgroundColor : '#fbf3e8',
          height : 350, 
        } }

        /*dayComponent={({ date, state }) => {
          //console.log(date);
          return (
            <View
              style={{
                width: 50,
                height: 60,
                borderWidth: 1,
                borderColor: '#f7d8ad',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 6,
              }}
            >
              <Text
                style={{
                  color: '#644e39',
                  fontSize: 18,
                  fontWeight: '600',
                }}
              >
                {date?.day}
              </Text>
            </View>
          );
        }}*/
      /> 
    </SafeAreaView>
    //</YStack>
  ) ; 
} ; 

export  default  App ; 