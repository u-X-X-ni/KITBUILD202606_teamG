//予定入力画面

import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
//import Storage from 'expo-sqlite/kv-store';  きさらがDB終わってから

const  EditScreen  =  ( )  =>  { 
  const { selected } = useLocalSearchParams();
  const [ title, setTitle] = useState('');
	const [ startTime, setStartTime] = useState('');
	const [ endTime, setEndTime] = useState('');

  return(
    <SafeAreaView style={{marginHorizontal: 12}}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
			{/*ボタン（戻る）*/}
        <Button
          title="< 戻る" 
          onPress={() => router.push({pathname:'/day/date', params:{selected}})}
        />
				<Button  //保存できるような処理を書かないといけないはず！！
          title="保存" 
          onPress={() => router.push({pathname:'/day/date', params:{selected}})}
					//onPress={() => console.log(selected, title, startTime, endTime)}
        />
			</View>
			{/*見出し*/}
        <Text style={{fontSize: 25, marginBottom: 20}}>
	        予定を追加
        </Text>
			{/*テキスト（日付の表示）*/}
        <Text style={styles.title}>
					日付
        </Text>
				<Text style={styles.text}>
          {selected}{/* ←←選択した日付を受け取る（Text中のコメントアウトはこの書き方）*/}
        </Text>
			{/*予定*/}
        <Text style={styles.title}>
	        予定
        </Text>
				<TextInput
          multiline
      		style={styles.input}
					placeholder='予定を入力…'
          onChangeText={setTitle}
          value={title}
        />
			{/*時間*/}
        <Text style={styles.title}>
	        時間
        </Text>

			<View style={styles.row}>
				<Text style={[styles.text, {marginBottom: 0}]}>
	        開始時間
        </Text>
				<Text style={[styles.text, {marginBottom: 0}]}>
	        終了時間
        </Text>
			</View>
			<View style={styles.row}>
				<TextInput
      		style={[styles.input, {width:63}]}
					placeholder='00:00'
          onChangeText={setStartTime}
          value={startTime}
        />
				<Text style={{fontSize: 19, marginTop: 5, marginBottom: 25, padding: 5}}>
					〜
				</Text>
				<TextInput
      		style={[styles.input, {width:63}]}
					placeholder='00:00'
          onChangeText={setEndTime}
          value={endTime}
        />
			</View>
    </SafeAreaView>
  );
};
export  default  EditScreen ;

//TextとかTextInputのスタイル
const styles = StyleSheet.create({
	title:{  //小見出し
		fontSize: 22
	},
	text:{
		fontSize: 20,
		padding: 5,
		marginBottom: 18
	},
	input:{  //入力欄
		fontSize: 19,
		marginTop: 5,
		marginBottom: 25,
		marginHorizontal: 5,
	  borderWidth: 1,
    padding: 5
	},
	row: {
    flexDirection: 'row',
    gap: 0,  //間隔を空ける設定（今は0にしている）
  },
});