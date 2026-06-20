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
    <SafeAreaView>
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
        //backgroundColor : 'orange',　こんな感じで書けば背景変わった（数字部分以外）
        height : 350, 
        } } 
      /> 
    </SafeAreaView>
    //</YStack>
  ) ; 
} ; 

export  default  App ; 